window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Image Gallery functionality
    const imageCategories = {
        'bottle': [
            'Shaker bottle.png', 'acetonflasche-1.png', 'botella-500ml-lamborghini.png', 'botella-tupperware-1.png',
            'bottle-1013.png', 'bottle-765.png', 'bottle-786.png', 'bottle-825.png', 'bottle-832.png', 'bottle-841.png',
            'bottle-881.png', 'bottle-905.png', 'bottle-966.png', 'bottle-973.png', 'bottle-and-cap-design.png',
            'bottle-assembly-surface.png', 'bottle-opener-with-collection.png', 'coke-bottle-49.png', 'eco-bottle-2.png',
            'fancy-bottle-third-evolution.png', 'glass-bottle-77.png', 'glue-bottle-25-ml.png', 'helix-protein-sharker.png',
            'hidrodine-betadine-1.png', 'high-density-polyethylene-bottle-hdpe-botella-de-polietileno.png', 'lemonade-bottle-1.png',
            'lemonade-bottle-2.png', 'lid-for-a-3d-scan-of-a-thermos.png', 'mini-water-bottle-1.png', 'modern-bottle-design.png'
        ],
        'bulb': [
            '1-5-volt-bulb-1.png', '9w-led-bulb.png', 'bulb-146.png', 'bulb-65.png', 'bulb-67.png', 'bulb-77.png',
            'bulb-with-a-body.png', 'cfl-bulb-112.png', 'ed17-light-bulb-w-e26.png', 'edison-light-bulb-1.png',
            'energy-bulb-3.png', 'ge-1157-tail-light-bulb.png', 'k-e-i-t170-230v-20w.png', 'led-bulb-14.png',
            'led-bulb-20w-2.png', 'led-bulb-24.png', 'led-bulb-model-high-power-lamp.png', 'led-light-bulb-5.png',
            'led-lightbulb-philips-1.png', 'light-bulb-105.png', 'light-bulb-35.png', 'light-bulb-57.png',
            'light-bulb-63.png', 'light-bulb-85.png', 'light-bulb-cfl-1.png', 'long-tubular-led-filament.png',
            'lotus-styled-bulbs.png', 'neon-light-bulb-1.png'
        ],
        'cosmetic': [
            '3d-model-vaseline-bottle-realistic.png', '5th-avenue-elizabeth-arden-perfume.png', 'ail-polish-bottle-containers-with-brush-cap.png',
            'aloe-vera-lotion-bottle-1.png', 'attar_perfume_bottle.png', 'can-for-oat-milk-cream-for-body-care.png',
            'chanel-no-5-perfume-bottle.png', 'clinique-serum-foundation-packaging.png', 'colgate-toothpaste-2.png',
            'colgate-toothpaste-3.png', 'colgate-toothpaste-4.png', 'cosmetic-cream-jar-1.png', 'cosmetic-jar.png',
            'cosmetic-squeeze-tube-bottle-container-with-flip-cap-1.png', 'cosmetic-squeeze-tube-bottle-container-with-flip-cap-2.png',
            'cream-eyeshadow-mini-container.png', 'cream-tube-2.png', 'cream-tube-3.png', 'crown-glass-perfume.png',
            'glass-jar-60ml-1.png', 'h-d-type-perfume-bottle.png', 'intenso-fragrance-by-dolce-gabbana.png',
            'lipstick-13.png', 'mac-lipstick.png', 'nomade-chloe-perfume-bottle-with-leather-strap.png',
            'octagonal-bottle-1.png', 'oval-squared-diptyque-perfume-bottle.png', 'perfume-bottle-20.png',
            'perfume-bottle-43.png', 'perfume-bottle-91.png', 'perfume-bottle-93.png'
        ],
        'liquor': [
            'back-pocket-bottle-1.png', 'bottle-container-for-liquid-detergent.png', 'bottle-design-45.png',
            'bottle-design-46.png', 'courvoisier-liquor-bottle.png', 'courvoisier-xo-bottle.png', 'don-julio-bottle.png',
            'glass-liquor-bottle-for-mockup.png', 'heart-bottle.png', 'hennesey-cognac-glass-bottle.png',
            'hexagonal-bottle-1.png', 'lemonade-bottle-1.png', 'lemonade-bottle-2.png', 'liquid-sugar-bottle-proposal.png',
            'oil-bottle-250ml.png', 'plastic-bottle-182.png', 'plastic-bottle-blow-molding-1.png',
            'plastic-water-bottle-14.png', 'rum-glass-bottle-captain-morgan.png', 'sodastream-bottle-1.png',
            'steel-bottle-8.png', 'texture-bottle-1.png', 'whiskey-bottle-13.png', 'whiskey-bottle-14.png',
            'wine-bottle-stopper-2.png'
        ],
        'nut': [
            'Insert nuts chevron slots.png', 'allen-key-6mm-pan-head-flange-screw-m6.png', 'bolt-special-m30.png',
            'dfu3206-c6-double-nut-flanged-ball-screw-nut-o90.png', 'din-562-square-nut-m4.png',
            'din-69051-flanged-ball-screw-nut-complete.png', 'dsg12h-1.png', 'ender-t8-nut-1.png',
            'fabric-flexible-coupling-1.png', 'fabric-flexible-coupling-2.png', 'fabric-flexible-coupling-3.png',
            'gb812-lock-nuts-m10.png', 'lead-screw-nut-threaded-with-flange-8mm-diameter-2mm.png',
            'm10-1-25-nut-weld-square.png', 'm12-dome-nut-1.png', 'm4-t-slot-nut-1.png', 'm8-lobe-knob-1.png',
            'manhole-nut-1.png', 'metric-flange-nut-1.png', 'nut-m4-2020-10-6mm.png', 'nut-mode-1.png',
            'part-3-nut-of-shock-absorber.png', 'sfu1204-8.png', 'square-hexagonal-nut.png', 'square-nut-3.png',
            'threaded-rivet-hexagon.png', 'threaded-wood-lock-nut.png', 'turn-knob-1.png', 'weld-nut-m8.png'
        ],
        'others': [
            '1-quarter-motor-oil-concept-bottle.png', '3d-printed-oil-can.png', 'COVID_VACCINE.png',
            'bike-water-bottle-750.png', 'bottle-design-47.png', 'bottle-reservoir.png', 'dispenser-bottle.png',
            'fly-spray-bottle.png', 'generic-1qt-oil-container.png', 'keyshot-challenge-pull.png',
            'master-mechanic.png', 'medicine-bottle-12.png', 'medicine-bottle-15.png', 'oil-bottle-35.png',
            'oil-bottle-36.png', 'oil-bottle-37.png', 'prescription-medicine-digital-asset-5-1.png',
            'serum-glass-bottle-with-dropper.png', 'small-plastic-jar.png', 'spray-bottle-23.png',
            'spray-bottle-timist.png', 'tablet-bottle-plastic-1.png', 'third-proposal-pocket-liquid-sugar.png',
            'tire-cleaner-bottle-with-spraycap.png', 'water-spray-bottle-1.png'
        ],
        'rotation_switch': [
            '12mm-metal-push-button-switch-with-led-1.png', '12x12mm-square-actuator-momentary-pcb-1.png',
            '19mm-diameter-potentiometer-knob-1.png', '22mm-mushroom-head-push-button.png', 'air-compressor-53.png',
            'apiel-19mm-epow-switch.png', 'arl-01.png', 'battery-cutt-off-switch-1.png', 'blue-sea-systems-300a-on-off-switch.png',
            'buzzer-30.png', 'bw9n0ba-n-type-1.png', 'cam-switch-prepinac-smeru-otacek-spamel.png',
            'custom-motorcycle-replacement-switch.png', 'dc_switch_32a-1.png', 'doorbell-4.png',
            'e-stop-plastic-230v-5a.png', 'emergency-start-button.png', 'ffh006-position-limit-switch.png',
            'fox-f4-electromechanical-pressure-switch.png', 'hand-wheel-encoder-2.png', 'ignition-stater-switch-35881tk4a01.png',
            'iwh-battery-disconnect-switch.png', 'kacon-k16-512-3-dpdt-selector.png', 'load-break-switch-lb232-32409-b33.png',
            'low-voltage-master.png', 'narva-battery-master-switch.png', 'nintendo-switch-lite-joycon-kob.png',
            'nockenschalter-1.png', 'pressure-switch-19.png', 'pull-switch-1.png', 'push-button-switch-color.png'
        ],
        'screwdriver': [
            'abb-for-slotted-heads-short-ribbed.png', 'chave-de-fenda-6.png', 'double-face-Screwdriver.png',
            'flat-screwdriver-4.png', 'hand-held-screwdriver.png', 'inbus-70082-t.png', 'needle-3.png',
            'pz2-screwdriver-1.png', 'realistic-screwdriver-assembly.png', 'screw-driver-2-1.png',
            'screwdriver-119.png', 'screwdriver-142.png', 'screwdriver-168.png', 'screwdriver-186.png',
            'screwdriver-317.png', 'screwdriver-327.png', 'screwdriver-332.png', 'screwdriver-335.png',
            'screwdriver-336.png', 'screwdriver-337.png', 'screwdriver-6-4mm-1.png', 'screwdriver-84.png',
            'screwdrivers-10.png', 'simple-screwdriver-design-with-rubber-inserts.png', 'slot-9.png',
            'spiral-ratchet-screwdriver.png', 'tap-90-degrees-holder.png', 'wera-vde-blade-holding-handle-with-blade.png'
        ],
        'shampoo_bottle': [
            'aqua-terra-water-premium.png', 'detergent-bottle-30.png', 'hand-and-body-lotion-threaded-dispenser.png',
            'hand-sanitaizer-bottle.png', 'hdpe-bottle.png', 'plastic-bottle-159.png',
            'plastic-stick-deodorant-tube-bottle-1.png', 'seed-storage-box.png', 'shampoo--4.png',
            'shampoo--5.png', 'shampoo-3.png', 'shampoo-bottle-1.png', 'shampoo-bottle-2-1.png',
            'shampoo-bottle-28.png', 'shampoo-bottle-30.png', 'shampoo-bottle-33.png', 'shampoo-bottle-41.png',
            'shampoo-bottle-43.png', 'shampoo-bottle-47.png', 'shampoo-bottle-st-1.png', 'steel-bottle-10.png',
            'stylish-bottle-2.png', 'two-in-one-bottle-packaging.png', 'ultra-400-1.png'
        ],
        'valve': [
            '1-2in-t-valve-1.png', '1-pressure-reducing-valve-prv-1.png', '2-cpvc-ball-valve.png',
            '2-way-instrumentation-valve.png', 'Angle Ball Valve1.png', 'Ball Valve Assembly for Flow Analysis.png',
            'Canilla de Bronce.png', 'Electrically actuated butterfly valve with electric actuator.png',
            'afr-2000-1.png', 'air-pressure-regulator.png', 'ball-valve-18.png', 'ball-valve-201.png',
            'ball-valve-28.png', 'ball-valve-78.png', 'ball-valve-89.png', 'ball-valve-dn15-2.png',
            'ball-valve-fauncet-1.png', 'ball-valve-kugelhahn-1.png', 'ball-valve-pvc-1.png',
            'brass-ball-valve-valvula-de-bola.png', 'din25-ball-valve-1.png', 'full-port-ball-valve-1_2-genebre-pn63.png',
            'gas-connection-valve-with-tas-valvula.png', 'globe-valve-9.png', 'half-inch-valve.png',
            'hy-lok-bpvh-4t-1-2.png', 'hy-lok-bpvh-4t-1-4.png', 'hydroseal-fortis-ball-valve-1-1-4in-1.png',
            'kobold-bypass-level-switch-model-nbe.png', 'manual-pinch-valve-hpv-type-1.png'
        ]
    };

    function loadImages(category) {
        const gallery = $('#image-gallery');
        gallery.html('<div class="loading">Loading images...</div>');
        
        setTimeout(() => {
            gallery.empty();
            const images = imageCategories[category];
            const basePath = './static/images/dataset_figs/' + category + '/';
            
            images.forEach((imageName, index) => {
                const imagePath = basePath + imageName;
                const displayName = category + '-' + (index + 1).toString().padStart(2, '0');
                
                const imageItem = $(`
                    <div class="image-item">
                        <img src="${imagePath}" alt="${displayName}" loading="lazy">
                        <div class="caption">${displayName}</div>
                    </div>
                `);
                
                gallery.append(imageItem);
            });
        }, 300);
    }

    // Tab click handlers
    $('.tabs li').click(function() {
        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        
        const category = $(this).data('category');
        loadImages(category);
    });

    // Load initial category
    loadImages('bottle');

});
