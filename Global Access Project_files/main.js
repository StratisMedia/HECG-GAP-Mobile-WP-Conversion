// version 2.6

lp = lp || {};
lp.text = {
  heightErrorAllowance: 16,
  getTextElementMetrics: function() {
    var metrics = {};
    this.textElements.each(function(i, e) {
      metrics[e.id] = {
        designHeight: parseInt(lp.jQuery('#'+e.id).css('height'), 10)
      };
    });
    return metrics;
  },

  adjustTextHeight: function(e, designHeight, adjustments) {
    var adjust = 1;
    var maxAdjust = 50;
    var w = parseInt(lp.jQuery('#'+e.id).css('width'), 10);

    while ((lp.jQuery(e)[0].offsetHeight - this.heightErrorAllowance) > designHeight && adjust <= maxAdjust) {
      lp.jQuery(e)[0].style.width = (w + adjust) + 'px';
      adjust++;
    }
    adjustments.push(adjust);
  },

  fixIELastChildIssue: function() {
     var browser = lp.jQuery.browser;

     if(browser.msie && parseFloat(browser.version) <= 8.0 ) {
       lp.jQuery("div.lp-pom-root .lp-pom-text>p:last-child").css('margin-bottom', '0px');
     }
  },


  fixTextHeights: function() {
    this.textElements = this.textElements || lp.jQuery(".lp-pom-text");
    this.textElementMetrics = this.textElementMetrics || this.getTextElementMetrics();

    var debug = '';
    var adjustments = [];
    var self = this;

    this.textElements.each(function(i, e) {
      e.style.height = 'auto';
      designHeight = self.textElementMetrics[e.id].designHeight;
      debug += e.id+':  '+designHeight+' '+e.offsetHeight+'\n';

      if ((e.offsetHeight - self.heightErrorAllowance) > designHeight) {
        self.adjustTextHeight(e, designHeight, adjustments);
      }
    });

    this.fixIELastChildIssue();
  }
};

lp.jQuery(document).ready(function() {
  lp.text.fixTextHeights();
});
