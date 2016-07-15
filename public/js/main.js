function runFuncAfterFinishingTyping(delay, selector, func) {
    var typingTimer;
    var doneTypingInterval = delay;
    var $input = selector;

    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        func(selector);
    }
}

function reportContent() {
    var textArr = ['01', '02', '03', '04', '11', '12', '21', '22', '31', '32', '41', '42', '51', '52', '61', '62', '71', '72', '81', '82'],
        checkBoxArr = ['13', '23', '33', '43', '53', '63', '73', '83'],
        count = 0,
        obj = {};

    textArr.forEach(function (item) {
        obj[item] = $('#' + item).text();
        count++;
    });

    checkBoxArr.forEach(function (item) {

        if ($("#" + item).css('display') !== 'none') {
            obj[item] = $("#" + item).is(":checked");
        }
        count++;
    });

    if (count == (textArr.length + checkBoxArr.length)) {

        $.ajax({
            url: '/submitReport',
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
            }
        });

        textArr.forEach(function (item) {
            $('#' + item).text("");
        });
        checkBoxArr.forEach(function (item) {
            $("#" + item).css('display', 'none');
        });

        $('#submitStatus').html('<b>提交成功</b>');

        setTimeout(function () {
            $('#submitStatus').html('');
        }, 2000);
    }
}

function displayCheckBoxOrNot(selec) {

    runFuncAfterFinishingTyping(500, selec, function () {
        var serial = Number(arguments[0].selector.match(/#(.*)2/)[1]);

        if ($(selec).text() !== '') {
            $("#" + serial + '3').css('display', "");
        } else {
            $("#" + serial + '3').css('display', "none");
        }
    });
}

$(document).ready(function () {

    var val = $("input[type='checkbox']").is(":checked");

    $('#reportSubmitButton').click(function () {
        
        reportContent();

    });

    displayCheckBoxOrNot($('#12'));
    displayCheckBoxOrNot($('#22'));
    displayCheckBoxOrNot($('#32'));
    displayCheckBoxOrNot($('#42'));
    displayCheckBoxOrNot($('#52'));
    displayCheckBoxOrNot($('#62'));
    displayCheckBoxOrNot($('#72'));
    displayCheckBoxOrNot($('#82'));

});
