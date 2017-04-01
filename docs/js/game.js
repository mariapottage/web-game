var game = {
  seats: [$('#seat1'), $('#seat2'), $('#seat3') ,$('#seat4'), $('#seat5')],
  names: ['zombie1', 'zombie2', 'zombie3', 'zombie4', 'zombie5'],
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
  },
  gen_bottles:function() {
    this.redbottle = new Winebottle($("#wine-red"), "red");
    this.whitebottle = new Winebottle($("#wine-white"), "white");
  },
  gen_success: function() {
    $('.overlay').fadeIn();
    setTimeout(function() {
      $('.overlay').fadeOut();
    }, 500);
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
      console.log("You pick right");
      game.gen_success();
    } else if (!game.selected_person) {
      console.log("You haven't selected a person");
    } else {
        console.log("You poured the wrong wine");
    }
  });
};


var Person = function(seat, name) {
  this.seat = seat;
  this.name = name;
  this.selectSeat();
  this.selectWine();
  this.attachListeners();
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
  });
};
