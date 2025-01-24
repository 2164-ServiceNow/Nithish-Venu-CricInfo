app.controller('HomeController', function($interval) {
    const vm = this;
 
    // Banner images
    vm.bannerImages = [
      'assets/banner2.png',
      'assets/banner1.png',
      'assets/ct2025.png',
    ];
 
    vm.activeSlide = 0;
 
    // Automatic sliding logic
    $interval(() => {
      vm.activeSlide = (vm.activeSlide + 1) % vm.bannerImages.length;
    }, 3000);
  });
  app
  .component('home', {
    templateUrl: 'components/home/home.html',
    controller: 'HomeController'
  });
 
