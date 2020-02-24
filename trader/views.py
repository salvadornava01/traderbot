from django.shortcuts import render
from django.core.serializers import serialize
import pickle
import json
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect, HttpResponseBadRequest
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
from trader.scikit_functions import *

alpha_vantage_key = '90ST131NU25O2KF5'
ts = TimeSeries(alpha_vantage_key)
tech_ind = TechIndicators(alpha_vantage_key)
fechas_data = []
stock_prices = []
# Create your views here.
def home_view(request, *args, **kwargs):
    context = {'page_title':'Trader Home'}
    if request.method == 'POST':
        share_symbol = request.POST['prueba'].upper()
        share_data, meta = ts.get_daily(symbol=share_symbol)
        print(share_data['2019-09-12'])        

    if request.is_ajax():
        try:
            # If user request Stock Prices 
            if 'stock' in request.GET:
                share_symbol = request.GET['stock'].upper()
                print(share_symbol)   
                share_data, meta = ts.get_intraday(symbol=share_symbol, interval='5min', outputsize='full')
                fechas = []
                cierres = []
                # import pdb
                # pdb.set_trace()
                for i in share_data.keys(): 
                    fechas.append(i)
                    cierres.append(share_data[i]['4. close'])
                fechas = fechas[0:1000]
                cierres = cierres[0:1000]
                fechas.reverse()
                cierres.reverse()
                request.session['fechas_data'] = fechas[:-5]
                request.session['stock_prices'] = cierres[:-5]
                request.session['future_prices'] = cierres[5:]
                data = [share_symbol,fechas,cierres]
                data_json = json.dumps(data)
                return HttpResponse(data_json, content_type='application/json')

            # Else if user request Bollinger Data
            elif 'bollinger_data' in request.GET:
                share_symbol = request.GET['bollinger_data'].upper()
                bbands_data, bbands_meta = tech_ind.get_bbands(symbol=share_symbol, interval='5min')
                bbands_values = [[],[],[]]
                for i in bbands_data.keys():
                    bbands_values[0].append(bbands_data[i]['Real Middle Band'])
                    bbands_values[1].append(bbands_data[i]['Real Upper Band'])
                    bbands_values[2].append(bbands_data[i]['Real Lower Band'])
                anly100_middle = bbands_values[0][:77]
                anly100_upper = bbands_values[1][:77]
                anly100_lower = bbands_values[2][:77]
                anly100_middle.reverse()
                anly100_upper.reverse()
                anly100_lower.reverse()
                print(share_symbol)

                data = [anly100_middle, anly100_upper, anly100_lower]
                data_json = json.dumps(data)

                return HttpResponse(data_json, content_type='application/json')

            # Else if user request RSI Data
            elif 'get_rsi_data' in request.GET:
                share_symbol = request.GET['get_rsi_data'].upper()
                rsi_data, rsi_meta = tech_ind.get_rsi(symbol=share_symbol, interval='5min', time_period=14, series_type = 'close')
                rsi_values = []
                fechas = []
                for i in rsi_data.keys():
                    fechas.append(i)
                    rsi_values.append(rsi_data[i]['RSI'])
                # fechas.reverse()
                # rsi_values.reverse()
                fechas = fechas[:1000]
                rsivalues = rsi_values[:1000]
                fechas.reverse()
                rsivalues.reverse()
                request.session['rsi_values'] = rsivalues[:-5]
                data = [share_symbol, fechas, rsivalues]
                data_json = json.dumps(data)
                return HttpResponse(data_json, content_type='application/json')


            # Else if user request MACD Data
            elif 'get_macd_data' in request.GET:
                share_symbol = request.GET['get_macd_data'].upper()
                macd_data, macd_meta = tech_ind.get_macd(symbol=share_symbol, interval='5min', series_type='close', fastperiod=12, slowperiod=26, signalperiod=9)
                # import pdb
                # pdb.set_trace()
                fechas = []
                macd_values = [[],[],[]]
                for i in macd_data.keys():
                    fechas.append(i)
                    macd_values[0].append(macd_data[i]['MACD'])
                    macd_values[1].append(macd_data[i]['MACD_Hist'])
                    macd_values[2].append(macd_data[i]['MACD_Signal'])
                fechas = fechas[:1000]
                macd = macd_values[0][:1000]
                macd_hist = macd_values[1][:1000]
                macd_sign = macd_values[2][:1000]
                fechas.reverse()
                macd.reverse()
                macd_hist.reverse()
                macd_sign.reverse()
                request.session['macd_data'] = [macd[:-5], macd_hist[:-5], macd_sign[:-5]]
                data = [fechas, macd, macd_hist, macd_sign]
                data_json = json.dumps(data)
                return HttpResponse(data_json, content_type='application/json')
        except Exception as inst:
            print(inst)
            # import pdb
            # pdb.set_trace()
            data_json = json.dumps(inst.args[0])
            return HttpResponseBadRequest(data_json, content_type='application/json')

    # Else return the homepage rendering
    return render(request, 'home.html', context)

def train_model_view(request, *args, **kwargs):
    if request.is_ajax():
        try:
            # Get Training Data from session
            fechas_data = request.session['fechas_data']
            train_df = pd.DataFrame()
            train_df['FUTURE_PRICES'] = request.session['future_prices']
            train_df['PRICES'] = request.session['stock_prices']
            train_df['MACD'] = request.session['macd_data'][0]
            train_df['MACD_SIGN'] = request.session['macd_data'][2]
            train_df['MACD_HIST'] = request.session['macd_data'][1]
            train_df['RSI'] = request.session['rsi_values']
            
            # Only use 900 data points to train
            train_df = train_df[:-100]                       
            features = train_df.drop(['FUTURE_PRICES'], axis = 1)
            prices = train_df['FUTURE_PRICES']

            # Shuffle and split the data into training and testing subsets
            X_train, X_test, y_train, y_test = train_test_split(features, prices, test_size=0.2, random_state=350)
            # Fit the training data to the model using grid search
            reg = fit_model(X_train, y_train)

            # Store the trained model into a session variable 
            request.session['reg_model'] = pickle.dumps(reg).hex()

            # Get the param Max Depth from model fit
            param_max_depth = reg.get_params()['max_depth']
            message = 'The model training has been completed successfully'
            print(message)

            return HttpResponse(json.dumps([message]), content_type='application/json')

        except:
            return HttpResponseBadRequest(json.dumps('No data to train'), content_type='application/json')

    return render(request, 'home.html', context)

def model_trained_view(request, *args, **kwargs):
    if request.is_ajax():
        # Get the Trained Model from session variable
        reg_pickl = request.session['reg_model']
        reg_model = pickle.loads(bytes.fromhex(reg_pickl))

        # Prepare the final_test dataset
        final_fechas = request.session['fechas_data'][-100:]
        prices_set = request.session['stock_prices'][-100:]
        macd_set = request.session['macd_data'][0][-100:]
        macd_signal_set = request.session['macd_data'][2][-100:]
        macd_hist_set = request.session['macd_data'][1][-100:]
        rsi_set = request.session['rsi_values'][-100:]
        final_test_set = []
        predictions_array = []

        for i in range(100):
            final_test_set.append([prices_set[i],macd_set[i],macd_signal_set[i],macd_hist_set[i],rsi_set[i]])      
        # import pdb
        # pdb.set_trace()
        predictions = reg_model.predict(final_test_set)

        for i in range(100):
            predictions_array.append(str(predictions[i]))

        message = 'The predictions made succesfully'
        print(message)
        predictions_array
        prices_set

        return HttpResponse(json.dumps([message,final_fechas,prices_set,predictions_array]), content_type='application/json')