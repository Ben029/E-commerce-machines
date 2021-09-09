/**
 * 
 * @type ai_facet_wp_L4.ai_facet_wpAnonym$0|Function
 */

var ficheOiOpen = false;
var page_url = window.location.href;

(function($) {
	var first_load = true;
	
	$(window).on('load',function(){
		aiMasonry.init();
		aiDrilldown.hideLoader();
	});
	

	/**
	  * Actions on refresh (click on facet / change page)
	  */
	$(document).on('facetwp-refresh', function() {
		// show loader on refresh if not first load
		if( !first_load ){
			aiDrilldown.showLoader();
		}
		// close filters if open
		if($('.jsCriteriaToggle').hasClass('jsIsActive')){
			aiDrilldown.showCriteria();
		}
	});	 

	/**
	 * Actions once content is loaded
	 */
	$(document).on('facetwp-loaded', function() {
        page_url = window.location.href; // update var (fix issue with filters selection)

		$drilldownBlockLink = $('.jsBlockLink');
        $drilldownTitle = $('.jsPreventDefault');
		$drilldownFicheOi = $('.jsOiPage');
        $drilldownList = $('.jsDrilldownList');
		$drilldownMap = $('.jsDrilldownMap');
		$drilldownMapToggle = $('.jsDrilldownBtnList');

        $drilldownBlockLink.addClass('jsAjaxOi');

        $drilldownBlockLink.off('click.openFicheOi');
        $drilldownBlockLink.on('click.openFicheOi', function(event) {
            event.preventDefault();
            ficheOiOpen = true;
            $urlFicheOi = $j(this).find('a').attr('href');
            window.history.pushState({url : "" + $urlFicheOi + "", type : 'fiche'}, "Fiche Oi", $urlFicheOi);
		});

        $drilldownTitle.on('click', function(event) {
            event.preventDefault();
        });

		aiMasonry.init();
		if( !first_load ){
			aiDrilldown.hideLoader();
		}

        //reinit masonry
		aiOi.init();
        //hide empty facets
		hideEmptyFacets();
		setTimeout(hideEmptySelection, 200);
		first_load = false;

		// scroll top
        $('html, body').animate({
            scrollTop: 0
        }, 500);
	});

	/**
	 * hideEmptySelection
	 * 
	 * hide breadcrumb if selection is empty (no results)
	 * 
	 */
	function hideEmptySelection(){
		$.each(FWP.facets, function( key, val ){
			var $parent = $('.jsFacetWpSelection li[data-facet = "'+key+'"]');
			var $allSelection = $parent.find('span[data-value]');
			var nbSelection = $allSelection.length;
			var nbEmpty = 0;
			if(key != 'paged'){				
				$.each(val, function( key, val ){
					var $selection = $parent.find('span[data-value = "'+val+'"]');
					if($selection.length && $selection.html() === ''){
						$selection.remove();
						nbEmpty ++;
					}
				});
			}
			if (nbEmpty === nbSelection) {
				$parent.remove();
			}
		});
	}
	
	/**
	 * 
	 * hideEmptyFacets
	 * (official facetwp function)
	 *  
	 */
	function hideEmptyFacets(){
        $.each(FWP.settings.num_choices, function(key, val) {
            var $parent = $('.facetwp-facet-' + key).closest('.jsFacetCol');
            (0 === val) ? $parent.hide() : $parent.show();
        });		
	}

    /**
	 * Open Fiche oi when click on marker or other
	 *
     * @param $urlFicheOi
     */
    function showFicheOI($urlFicheOi) {

		$j('html, body').animate({scrollTop: 0}, 1);
		
		var loader = setTimeout(aiDrilldown.showLoader(), 1000);
			
		if(	$drilldownFicheOi.hasClass('jsIsOpen') ) {
			closeFicheOi();
		}

        $.ajax({
            url : $urlFicheOi+"?isAjax=true",
            type: 'GET',
            dataType: 'html',
            success : function($html) {
				aiDrilldown.showFicheOI();
				$drilldownFicheOi.addClass('jsIsOpen');
                $($html).appendTo('.jsOiPage');
				aiDrilldown.hideLoader();
				aiFavorite.init();
            },
            complete : function() {
                var $drilldownFicheOiBtnClose = $('.jsPreventDefault');

                $drilldownFicheOiBtnClose.on('click', function(event) {
                    event.preventDefault();
                    $id = window.location.href;
                    $drilldownMap.trigger('closeFicheOi', [$id]);
					window.history.pushState({url : "" + page_url + "", type : 'list'}, "Drilldown", page_url);

                });

                aiFicheOi.init();
            }
        });
    }

    /**
	 * Close Fiche OI On drilldown
	 *
     */
    function closeFicheOi() {
        ficheOiOpen = false;
        $drilldownFicheOi.removeClass('jsIsOpen');
        $drilldownList.addClass('jsIsShow');
        $drilldownFicheOi.empty();
		aiMasonry.init();
    }


    /**
	 * Control history url
	 *
     * @param state
     */
    history.onChange = function(state) {
		if (state && state.type == 'fiche') {
			showFicheOI(state.url, state.urlListe);
		}
		else {
			closeFicheOi();
		}
    };
	
})(jQuery);
