"use strict";

// Class definition
var KTProfileFollowers = function () {
    // init variables
    var showMoreButton;
    var showMoreCards;
    var followBtn;

    // Private functions
    var handleShowMore = function () {
        if (!showMoreButton) {
            return;
        }

        // Show more click
        showMoreButton.addEventListener('click', function (e) {
            showMoreButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click 
            showMoreButton.disabled = true;
            
            setTimeout(function() {
                // Hide loading indication
                showMoreButton.removeAttribute('data-kt-indicator');

                // Enable button
				showMoreButton.disabled = false;

                // Hide button
                showMoreButton.classList.add('d-none');

                // Show card
                showMoreCards.classList.remove('d-none');

                // Scroll to card
                KTUtil.scrollTo(showMoreCards, 200);
            }, 2000);
        });
    }

    // Follow button
    var handleUFollow = function() {
        if (!followBtn) {
            return;
        }

        followBtn.addEventListener('click', function(e){
            // Prevent default action 
            e.preventDefault();
            
            // Show indicator
            followBtn.setAttribute('data-kt-indicator', 'on');
            
            // Disable button to avoid multiple click 
            followBtn.disabled = true;

            // Check button state
            if (followBtn.classList.contains("btn-success")) {
                    setTimeout(function() {
                    followBtn.removeAttribute('data-kt-indicator');
                    followBtn.classList.remove("btn-success");
                    followBtn.classList.add("btn-light");
                    followBtn.querySelector(".svg-icon").classList.add("d-none");
                    followBtn.querySelector(".indicator-label").innerHTML = 'Follow';
                    followBtn.disabled = false;
                }, 1500);   
            } else {
                    setTimeout(function() {
                    followBtn.removeAttribute('data-kt-indicator');
                    followBtn.classList.add("btn-success");
                    followBtn.classList.remove("btn-light");
                    followBtn.querySelector(".svg-icon").classList.remove("d-none");
                    followBtn.querySelector(".indicator-label").innerHTML = 'Following';
                    followBtn.disabled = false;
                }, 1000);   
            }        
        });        
    }

    // Public methods
    return {
        init: function () {
            showMoreButton = document.querySelector('#kt_followers_show_more_button');
            showMoreCards = document.querySelector('#kt_followers_show_more_cards');
            followBtn = document.querySelector('#kt_user_follow_button');

            handleShowMore();
            handleUFollow();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTProfileFollowers.init();
});