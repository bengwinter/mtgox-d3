require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'mtgox'

get '/asks.json' do 
	MtGox.asks.map {|f| 
		{price: f.price, timestamp: f.timestamp, volume: f.amount}
	}.to_json
end

get '/bids.json' do 
	MtGox.bids.map {|f| 
		{price: f.price, timestamp: f.timestamp, volume: f.amount}
	}.to_json
end

get '/trades.json' do 
	MtGox.trades.map {|f| 
		{price: f.price, volume: f.amount}
	}.to_json
end

get '/ticker.json' do
	MtGox.ticker.sell.to_json
end