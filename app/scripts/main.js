$(document).ready(function() {
  var redCar = createCar('#redCar', 10);
  var blueCar = createCar('#blueCar', 1q0);
  var modal = $('#modalInfo');
  var win = $('#nameWin');
  var racingRedCar = redCar.racing;
  var racingBlueCar = blueCar.racing;
  var spanText = $('.markers__score-first');
  var modalCTN = $('.modal-info__ctn');
  var raceTrack = $('.racetrack');
  var sw = false;

  modal.hide();

  function createCar(elemId, speed){
    return {
      $elem: $(elemId),
      speed: speed,
      position: 10,
      move: function() {
        this.position += this.speed;
        this.$elem.css('left', this.position + 'px');
      },
      reset: function() {
        this.position = 10;
        this.$elem.css('left', this.position + 'px');
      },
      racing: 0
    };
  }q

  function showModalInfo(name, colorText, colorShadow) {
    modal.show();
    win.html(name);
    modalCTN.css('color', colorText);
    modalCTN.css('box-shadow', 'inset 0 -20px 101px' + colorShadow);
  }

  function markers(id, idText, text, color) {
    $('.markers__' + id).css('color', color);
    $('.markers__' + id).css('border-color', color);
    $('.markers__' + idText).html(text);
  }

  function resetPosition() {
    redCar.reset();
    blueCar.reset();
    markers('ctn--markers-score', 'score-first', 'Begin', '#E7DC53');
  }

  markers('ctn--markers-score', 'score-first', 'Begin', '#E7DC53');
  markers('ctn--markers-racing', 'racing-data-red', 'RED: ' + racingRedCar, '#E7DC53');
  markers('ctn--markers-racing', 'racing-data-blue', 'BLUE: ' + racingBlueCar, '#E7DC53');

  $(window).on('keydown', function(evt) { //keyup
    var keyChar = event.keyCode || window.event;

    if(sw == false) {
      if (keyChar == '81') { redCar.move(); }
      if (keyChar == '80') { blueCar.move(); }

      if(redCar.position == blueCar.position) {
        markers('ctn--markers-score', 'score-first', 'Equal', '#E7DC53');
      } else {
        if (redCar.position > blueCar.position) {
          markers('ctn--markers-score', 'score-first', 'Red car FIRST', '#D0021B');
        } else {
          markers('ctn--markers-score', 'score-first', 'Blue car FIRST', '#75A1D4');
        }
      }

      if(redCar.position == 960 && sw == false) {
        showModalInfo('Red Car', '#D0021B', 'rgba(208, 2, 27, 0.5)');
        racingRedCar = (racingRedCar + 1);
        sw = true;
      } else if(blueCar.position == 960 && sw == false) {
        showModalInfo('Blue Car', '#75A1D4', 'rgba(117, 161, 212, 0.5)');
        racingBlueCar = (racingBlueCar + 1);
        sw = true;
      }
    } else {
      markers('ctn--markers-racing', 'racing-data-red', 'RED: ' + racingRedCar, '#D0021B');
      markers('ctn--markers-racing', 'racing-data-blue', 'BLUE: ' + racingBlueCar, '#75A1D4');
      if(racingRedCar > racingBlueCar) {
        markers('ctn--markers-racing', 'racing-data-red', 'RED: ' + racingRedCar, '#D0021B');
      } else if(racingBlueCar > racingRedCar) {
        markers('ctn--markers-racing', 'racing-data-blue', 'BLUE: ' + racingBlueCar, '#75A1D4');
      } else {
        markers('ctn--markers-racing', 'racing-data-red', 'RED: ' + racingRedCar, '#E7DC53');
        markers('ctn--markers-racing', 'racing-data-blue', 'BLUE: ' + racingBlueCar, '#E7DC53');
      }
    }
  });

  $('#tryAgain').click(function() {
    modal.hide();
    resetPosition();
    sw = false;
  });

  $('#restart').click(function() {
    resetPosition();
  });
});

