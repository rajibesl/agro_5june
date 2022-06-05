/*
      ALGOLIA SEARCH AUTOCOMPLETE
        Will be moved to (create) a new module
        probably preact.js
   */
import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.esm.browser.js';

const { autocomplete, getAlgoliaResults } = window['@algolia/autocomplete-js'];

const searchClient = algoliasearch(
  '3KRVB4Z1YR',
  'b57edddbc4d7e7af5e6522aa1dcef6b4'
);

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search for products',
  getSources({ query }) {
    return [
      {
        sourceId: 'products',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'agro_product',
                query,
                params: {
                  hitsPerPage: 10,
                  attributesToSnippet: ['name:10', 'description:35'],
                  snippetEllipsisText: '…',
                },
              },
            ],
          });
        },
        templates: {
          item({ item, components, createElement }) {
            return createElement(
              'a',
              { className: 'aa-ItemWrapper', href: item.se_name },
              createElement(
                'div',
                { className: 'aa-ItemContent' },
                createElement(
                  'div',
                  { className: 'aa-ItemIcon aa-ItemIcon--alignTop' },
                  createElement('img', {
                    src: item.default_picture_model.image_url,
                    alt: item.name,
                    width: 40,
                    height: 40,
                  })
                ),
                components.Highlight({
                  hit: item,
                  attribute: 'name',
                  tagName: 'i',
                })
              )
            );
          },
          noResults() {
            return 'No results.';
          }
        },
      },
    ];
  },
});

autocomplete({
  container: '#autocompleteMobile',
  placeholder: 'Search for products',
  getSources({ query }) {
    return [
      {
        sourceId: 'products',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'agro_product',
                query,
                params: {
                  hitsPerPage: 10,
                  attributesToSnippet: ['name:10', 'description:35'],
                  snippetEllipsisText: '…',
                },
              },
            ],
          });
        },
        templates: {
          item({ item, components, createElement }) {
            return createElement(
              'a',
              { className: 'aa-ItemWrapper', href: item.se_name },
              createElement(
                'div',
                { className: 'aa-ItemContent' },
                createElement(
                  'div',
                  { className: 'aa-ItemIcon aa-ItemIcon--alignTop' },
                  createElement('img', {
                    src: item.default_picture_model.image_url,
                    alt: item.name,
                    width: 40,
                    height: 40,
                  })
                ),
                components.Highlight({
                  hit: item,
                  attribute: 'name',
                  tagName: 'i',
                })
              )
            );
          },
          noResults() {
            return 'No results.';
          }
        },
      },
    ];
  },
});





/** */
/************************* */
/************************* */
/** */
/** */

function setMenuPosition() {
  const x = $('.top-links').height();
  const y = $('.header-main').height();
  const scrollTop = $(document).scrollTop();

  if (scrollTop > 570) {
    $('.go-to-top').show('slow');
  } else {
    $('.go-to-top').hide('slow');
  }

  if (scrollTop >= (x + y)) {
    $('.top-menu')
      .addClass('fixed-top has-border shadow-sm')
      .find('.navbar-brand').show(400);

    if (!$('.common-breadcrumb').hasClass('stick'))
      $('.common-breadcrumb').addClass('stick');
    if (!$('#CustomSearchForm').hasClass('stick'))
      $('#CustomSearchForm').addClass('stick');

  } else {
    $('.top-menu')
      .removeClass('fixed-top has-border shadow-sm')
      .find('.navbar-brand').hide();
    $('.common-breadcrumb, #CustomSearchForm').removeClass('stick')
  }
}

function setProductCollateralNavPosition() {
  const t = $(window).width() > 982 ? 90 : 0;
  if (($('#productCollateralNav').offset().top - $(window).scrollTop()) <= t) {
    $('#productCollateralNav')
      .removeClass('bg-transparent')
      .addClass('stick bg-white shadow-sm');
  } else {
    $('#productCollateralNav')
      .removeClass('stick bg-white shadow-sm')
      .addClass('bg-transparent');
  }
}

function setProductCollateralNavActiveItem() {
  if ($('#productCollateralNav').hasClass('stick')) {
    $('.product-collateral .pc-wrap .card').each(function () {
      const x = $(this).offset().top - $(window).scrollTop();
      const t = $(window).width() > 982 ? 135 : 45;
      if (x > 0 && x < t) {
        const id = $(this).attr('id');
        $('#productCollateralNav .nav-link').removeClass('active');
        $(`#productCollateralNav .nav-link[href="#${id}"]`).addClass('active');
      }
    });
  } else {
    $('#productCollateralNav .nav-link').removeClass('active');
  }
}

$(document).ready(function () {

  //
  

  // Topmenu positioning
  setMenuPosition();
  $(window).scroll(function () {
    setMenuPosition();

    if ($('html').hasClass('html-product-details-page')) {
      setProductCollateralNavPosition();
      setProductCollateralNavActiveItem();
    }

  });

  // MegaMenu tabs - show on hover
  $('.shop-dropdown .nav-link')
    .hoverIntent(function () {
      $('.shop-dropdown .nav-link').blur();
      $(this).tab('show');
    });

  $('.shop-dropdown .nav-link')
    .click(function (e) {
      e.preventDefault();
    });

  // Prevent closing dropdown if clicked inside mega menu
  $(".shop-dropdown").click(function (e) {
    e.stopPropagation();
  });

  //
  $('.ni-shop-dropdown').on('hidden.bs.dropdown', function () {
    $('.toggle-icon', this).removeClass('fa-chevron-up').addClass('fa-chevron-down');
  });
  $('.ni-shop-dropdown').on('shown.bs.dropdown', function () {
    $('.toggle-icon', this).removeClass('fa-chevron-down').addClass('fa-chevron-up');
  });

  //
  $('.auth-page-go-back').click(function () {
    const host = window.location.origin;
    if (document.referrer.includes(host)) {
      window.history.back();
    } else {
      window.location.assign(host);
    }
  });

  //
  $('.go-to-top button').click(function () {
    $('html, body').animate({
      scrollTop: 0
    });
  });

  //
  $('#productCollateralNav .nav-link').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('href');
    const t = $(window).width() > 982 ? 135 : 45;
    $('html, body').animate({
      scrollTop: $(`${id}`).offset().top - (t - 2)
    }, 1000);
  });



  /*
   * COLOR SELECTOR
   * For DEMO only
   */
  //
  $('.color-selector.th-color').click(function () {
    const old = $('.top-links')
      .attr('class')
      .split(/\s+/)
      .find(x => x.includes('bg-'));
    const newest = 'bg-' + $(this).data('val');
    //
    if (newest == old)
      return;
    //
    $('.top-links').removeClass(old)
      .addClass(newest);
  });
  $('.color-selector.p-color').click(function () {
    const selected = $(this).data('val');
    let old = $('.btn-search')
      .attr('class')
      .split(/\s+/)
      .find(x => x.includes('bg-'));
    //
    if (selected == old)
      return;
    //
    old = old.replace('bg-', '');
    $(`.bg-${old}:not(.color-selector)`).removeClass(`bg-${old}`).addClass(`bg-${selected}`);
    $(`.text-${old}:not(.color-selector)`).removeClass(`text-${old}`).addClass(`text-${selected}`);
    $(`.border-${old}:not(.color-selector)`).removeClass(`border-${old}`).addClass(`border-${selected}`);

  });


  if (!$('.item-grid').hasClass('row')) {
    $('.item-grid').addClass('row no-gutters')
  }

  if (!$('.item-grid .item-box').hasClass('col-12')) {
    if ($('.item-grid .item-box').parents('.product-details-best-sellers').length > 0) {
      $('.item-grid .item-box').addClass('add-border px-1 py-1 col-12 col-sm-6 col-lg-4');
    } else {
      $('.item-grid .item-box').addClass('add-border px-1 py-1 col-12 col-sm-6 col-lg-4 col-xl-3 col-xlg-2');
    }
  }

});