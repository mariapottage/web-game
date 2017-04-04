$('button').on("click",function(){
  $('.welcomegame').toggleClass();
  $('.welcomeButton').hide();
});

var game = {
  seats: [$('#seat1'), $('#seat2'), $('#seat3') ,$('#seat4'), $('#seat5')],
  names: ["images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png","images/zombie5.png"],
  // 'zombie1', 'zombie2', 'zombie3', 'zombie4', 'zombie5'],
  // seatsIndex: -1,
  // namesIndex: -1,
  people:[],
  start: function() {
    console.log("Starting game.");
    this.gen_person();
    this.gen_bottles();
  },

  gen_person:function() {
    var random = Math.floor(Math.random()*5);
    var seat = this.seats[random];
    random = Math.floor(Math.random()*5);
    var name = this.names[random];
    this.people.push(new Person(seat, name));
    $(".selected.seat").css("background-size", "cover");
  },

  // gen_person:function() {
  //    var random = Math.floor(Math.random()*this.seats.count);
  //    var seat = this.seats[random];
  //    this.seats.splice(random,1);
  //    random = Math.floor(Math.random()*this.seats.count);
  //    var name = this.names[random];
  //    this.seats.splice(name,1);
  //    this.people.push(new Person(seat, name));
  //  },


  // gen_person:function() {
  //    seatIndex = Math.floor(Math.random()*this.seats.count);
  //    var seat = this.seats[random>=1];
  //
  //    namesIndex = Math.floor(Math.random()*this.seats.count);
  //    var name = this.names[random>=1];
  //
  //    this.people.push(new Person(seat, name));
  //  },

  gen_bottles:function() {
    this.redbottle = new Winebottle($("#wine-red"), "red");
    this.whitebottle = new Winebottle($("#wine-white"), "white");
  },
  // gen_success: function() {
  //   $('.overlay').fadeIn();
  //   setTimeout(function() {
  //     $('.overlay').fadeOut();
  //   }, 500);
  // }

  gen_success: function() {

    console.log("Thank you", game.selected_person);
    $('#textbox').text("Thank you");
    $('#textbox').show();
     setTimeout(function() {
        $('#textbox').hide();
          $('#message').hide();
          $(".selected.seat").css("background", "url('images/barstool2.png')");
          $(".selected.seat").css("background-size", "contain");
          $(".selected.seat").css("background-repeat", "no-repeat");
          game.start();
     }, 1100);
   }

};

var Winebottle = function(bottle, name) {
  this.bottle = bottle;
  this.name = name;
  this.attachListeners();
};

Winebottle.prototype.attachListeners = function() {
  var that = this;
  this.bottle.on('click', function(event){
    console.log("Winebottle clicked", that);
    if (game.selected_person && that.name === game.selected_person.wine) {
      console.log("You pick right. You still have some brains left");
      $('#message').text("You poured the right wine. You still have some brains left.");
      $('#message').show();
      game.gen_success();
    } else if (!game.selected_person) {
      console.log("You haven't selected a person");
      $('#message').text("Please select a guest and ask for their order");
      $('#message').show();
    } else {
        console.log("You poured the wrong wine. A zombie might take a bite off your brain.");
        $('#message').text("You poured the wrong wine. A zombie might take a bite off the remaining of your small brain.");
        $('#message').show();
    }
  });
};


var Person = function(seat, name) {
  this.seat = seat;
  this.name = name;
  this.selectSeat();
  this.selectWine();
  this.attachListeners();
  $(".selected.seat").css('background-image','url(' + name + ')');
  $(".selected.seat").css("background-size", "cover");
};

Person.prototype.selectSeat = function () {
  this.seat.addClass("selected");
};

Person.prototype.selectWine = function () {
  var wines =["red", "white"];
  var random = Math.floor(Math.random()*2);
  this.wine = wines[random];
};

Person.prototype.attachListeners = function() {
  var that = this;
  this.seat.on('click', function(event){
    console.log("person clicked", that);
    game.selected_person = that;
    $('#textbox').text(that.wine);
    $('#textbox').show();
    $('#textbox').css({
    top: that.seat.position().top-120,
    left: that.seat.position().left-30
    });
  });
};

$('.exitButton').on("click",function(){
  $('.exitButton').Application.Quit();
});
