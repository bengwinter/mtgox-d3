// replaces document on ready function

$(function() {
  Plotter.getTrades();
})

var Plotter = {

  getTrades: function() {
    $.ajax({
      url: '/bids.json',
      type: 'GET',
      dataType: 'json',
      success: function(trades) {
        Plotter.plotTrades(trades);
      }
    });
  },

  plotTrades: function(trades) {
    var h = 700, 
    w = 1500,
    dataLength = trades.length,
    barWidth = w / dataLength;
    var svg = d3.select('#container')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
    .style('border', '2px solid black');

    var height = d3.scale
      .linear()
      .domain(Plotter.tradePriceDomain(trades))
      .range([0, h]);

    var colorScale = d3.scale
      .linear()
      .domain(Plotter.tradeVolumeDomain(trades))
      .range[0, 255];

    svg.selectAll('rect')
      .data(trades)
      .enter()
      .append('rect')
      .attr('x', function(d, i){
        return w / dataLength * i;
    })
    .attr('height', function(d, i){
      return height(d.price);
    })
    .attr('y', function(d, i){
      return h - height(d.price);
    })
    .attr('width', barWidth)
    .on('mouseenter', function (d, i) {
      $("#current-volume").text("$" + Number(d.price) + " Per BitCoin");
      d3.select(this)
      .transition()
      .duration(50)
      .style('fill', 'pink')
    })
    .on('mouseleave', function() {
      d3.select(this)
      .transition()
      .duration(100)
      .style('fill', 'black')
    })
  },

  tradePriceDomain: function(trades) {
    var min = trades[0].price*1000, max = min;
    $(trades).each(function(index, trade){
      if(trade.price*1000 < min) {
        min = trade.price*1000;
      }
      if(trade.price*1000 > max) {
        max = trade.price*1000
      }
    });
    return [min/1000, max/1000];
  },

  tradeVolumeDomain: function(trades) {
    var min = trades[0].volume, max = min;
    $(trades).each(function(index, trade) {
      if(trade.volume*1000 < min) {
        min = trade.volume;
      }
      if(trade.volume*1000 > max) {
        max = trade.volume;
      }
    });
    return [min/1000, max/1000];
  }
};