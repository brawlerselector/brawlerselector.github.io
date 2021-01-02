function update_brawlers() {
    brawlers = [];
    star_powers = {
        "8-bit": [],
        "shelly": [],
        "nita": [],
        "colt": [],
        "bull": [],
        "jessie": [],
        "brock": [],
        "dynamike": [],
        "bo": [],
        "tick": [],
        "emz": [],
        "el primo": [],
        "barley": [],
        "poco": [],
        "rosa": [],
        "rico": [],
        "darryl": [],
        "penny": [],
        "carl": [],
        "jacky": [],
        "piper": [],
        "pam": [],
        "frank": [],
        "bibi": [],
        "bea": [],
        "nani": [],
        "mortis": [],
        "tara": [],
        "gene": [],
        "max": [],
        "mr. p": [],
        "sprout": [],
        "spike": [],
        "crow": [],
        "leon": [],
        "sandy": [],
        "gale": []
    }
    $(".select_brawler").addClass("unselected");
    $(".brawler_sp").addClass("sp_unselected");
    for (brawler in player_brawlers) {
        curr_brawler = player_brawlers[brawler]["name"].toLowerCase();
        brawlers.push(curr_brawler);
        $(".select_brawler[brawler=\"" + curr_brawler + "\"]").removeClass("unselected");
        for (sp in player_brawlers[brawler]["starPowers"]) {
            curr_sp = player_brawlers[brawler]["starPowers"][sp]["name"];
            star_powers[curr_brawler].push(curr_sp);
            $(".brawler_sp[starpower=\"" + curr_sp + "\"]").removeClass("sp_unselected");
        }

    }
}
br_voice = new Audio();
br_voice.volume = .5;
menu_click_sound = new Audio("sfx/menu_click.ogg");
menu_click_sound.volume = .3;
menu_back_sound = new Audio("sfx/menu_back.ogg");
menu_back_sound.volume = .3;
sp_sfx = new Audio("sfx/starpower.ogg");
sp_sfx.volume = .5;
roulette_sound = new Audio("sfx/roulette_rolling.ogg");
roulette_sound.volume = .5;
rm_enabled = 1;
fs_enabled = 0;
sfx_enabled = 1;
rand_sp = 1;
br_voice_play = 1;
br_remove = 1;
rolling = 0;
set_opened = 0;
float_errors = 0;
scrolling = 0;
var showIt;
br_voices = {
    "8-bit": 3,
    "shelly": 4,
    "nita": 3,
    "colt": 4,
    "bull": 3,
    "jessie": 5,
    "brock": 7,
    "dynamike": 4,
    "bo": 5,
    "tick": 6,
    "emz": 5,
    "el primo": 7,
    "barley": 4,
    "poco": 4,
    "rosa": 4,
    "rico": 6,
    "darryl": 7,
    "penny": 3,
    "carl": 7,
    "jacky": 4,
    "piper": 4,
    "pam": 4,
    "frank": 6,
    "bibi": 6,
    "bea": 5,
    "nani": 4,
    "edgar": 11,
    "mortis": 4,
    "tara": 3,
    "gene": 14,
    "max": 5,
    "mr. p": 5,
    "sprout": 4,
    "byron": 10,
    "spike": 0,
    "crow": 3,
    "leon": 5,
    "sandy": 6,
    "amber": 11,
    "gale": 4,
    "surge": 10,
    "colette": 11,
    "lou": 12
}
all_brawlers = ["shelly", "nita", "colt", "bull", "jessie", "brock", "dynamike", "bo", "tick", "8-bit", "emz", "el primo", "barley", "poco", "rosa", "rico", "darryl", "penny", "carl", "jacky", "piper", "pam", "frank", "bibi", "bea", "nani", "edgar", "mortis", "tara", "gene", "max", "mr. p", "sprout", "byron", "spike", "crow", "leon", "sandy", "amber", "gale", "surge", "colette", "lou"];
brawlers = ["shelly", "nita", "colt", "bull", "jessie", "brock"];

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(".brawlers").css({ "overflow-y": "scroll" });
    $(".qs_window").css("transform", "translate(-50%, -50%) scale(.7)");
} else {
    $(".brawlers").css({ "overflow-y": "scroll" });
    $(".starpowers").css({ "overflow-y": "scroll" });
}

for (brawler in all_brawlers) {
    (new Image()).src = "img/" + all_brawlers[brawler] + ".png";
}

function toFullscreen() {
    document.body.requestFullscreen();
    update_roulette();
    $(".full_popup").css("display", "none");
    $("#fs_mode").removeClass("opt_off");
    $("#fs_mode").addClass("opt_on");
    $("#fs_mode").text("ON");
    fs_enabled = 1;
}

function randint(start, end) {
    randinterger = Math.floor(Math.random() * (end - start + 1)) + start;;
    return randinterger;
}


function float_error(text) {
    float_errors++;
    $(" body ").append("<div id=\"error_float" + float_errors + "\" class=\"float-e\">" + text + "</div>");
    $("#error_float" + float_errors).animate({
        top: event.pageY - 50 + "px",
        opacity: "0",
    }, 5000)

    setTimeout(function () {
        $(".float-e:not(:animated)").remove();
    }, 2100)
}

function update_roulette() {
    $(".roulette").remove();
    $(".winner").before("<div class=\"roulette\" style=\"display:none;\"></div>");
    for (brawler in brawlers) {
        $(".roulette").append("<img src=\"img/" + brawlers[brawler] + ".png\"/>")
    }
    $('div.roulette').roulette(option);
    $('img').on('dragstart', function (event) { event.preventDefault(); });
    $('div.roulette').on("click", function () {
        if (rolling == 0) {
            $('div.roulette').roulette("start");
            rolling = 1
            setTimeout(function () {
                rolling = 0;
            }, 5000);
        }
    });
}

$(".settings").on("click", function () {
    left_top = 0;
    right_top = 0;
    delay = 100;
    if (set_opened == 0) {
        menu_click_sound.play();
        for (brawler in all_brawlers) {
            if (brawlers.includes(all_brawlers[brawler])) {
                $(".scroller").append("<div class=\"select_brawler\" brawler=\"" + all_brawlers[brawler] + "\"><img class=\"brawler_img\" src=\"img/" + all_brawlers[brawler] + ".png\"></div>")
            } else {
                $(".scroller").append("<div class=\"select_brawler unselected\" brawler=\"" + all_brawlers[brawler] + "\"><img class=\"brawler_img\" src=\"img/" + all_brawlers[brawler] + ".png\"></div>")
            }
        };
        $(".brawler_wrapper").fadeIn(300, function () {
            $(".brawler_wrapper").css("display", "block");
            set_opened = 1;
            $(".brawler_img").on("click", function () {

                brawler_name = $(this).parent().attr("brawler");
                if (brawlers.includes(brawler_name) == false) {
                    brawlers.push(brawler_name);
                    $(this).parent().removeClass("unselected");
                } else {

                    index = brawlers.indexOf(brawler_name);
                    brawlers.splice(index, 1);
                    $(this).parent().addClass("unselected");

                }

                update_roulette()

            });

        });
    } else if (brawlers.length > 0) {
        menu_back_sound.play();
        update_roulette();
        $(".brawler_wrapper").fadeOut(300, function () {
            $(".select_brawler").remove();
        })
        set_opened = 0;
    } else {
        float_error("<center>YOU NEED TO HAVE AT LEAST <br>ONE ACTIVE BRAWLER!</center>");
    }
});

for (brawler in brawlers) {
    $(".roulette").append("<img src=\"img/" + brawlers[brawler] + ".png\"/>")
}

var option = {
    speed: 100,
    duration: 1.5,
    stopImageNumber: -1,
    startCallback: function () {
        if (rm_enabled == 1) {
            roulette_sound.play();
        }
        $(".ctr").css("opacity", "0");
        $(".invi_wall").css("display", "block");
        if (br_voice_play == 1 && br_voices[brawlers[p.stopImageNumber]] > 0) {
            br_voice.src = "sfx/" + brawlers[p.stopImageNumber] + "/" + brawlers[p.stopImageNumber] + " (" + randint(1, br_voices[brawlers[p.stopImageNumber]]) + ").ogg";
            hasvoice = 1
        } else {
            hasvoice = 0
        }
    },
    slowDownCallback: function () {
    },
    stopCallback: function ($stopElm) {
        if (rm_enabled == 1) {
            $(roulette_sound).animate({ volume: 0 }, 1000);
        }
        $(".winner .winner_img").attr("src", "img/" + brawlers[p.stopImageNumber] + ".png");
        $(".winner").css({ "transform": "translate(-50%, -50%) scale(1.2)", "visibility": "visible" });

        voice_dur = 1000;

        if (brawlers.length > 1 && br_remove == 1) {
            if (set_opened == 1) {
                $("p").filter(function () { return ($(this).text() === brawlers[p.stopImageNumber].toUpperCase()) }).parent().find(".checkbox").prop("checked", false);
            }
            brawlers.splice(p.stopImageNumber, 1);
        }
        setTimeout(function () {
            $(".hideIt").css({ "opacity": "1", "visibility": "visible", "z-index": "99" });
            $(".invi_wall").css("display", "none");
            if (br_voice_play == 1 && hasvoice == 1) {
                br_voice.play();
            }
        }, voice_dur);
    }
}

$('div.roulette').roulette(option);
$('div.roulette').on("click", function () {
    if (rolling == 0) {
        $('div.roulette').roulette("start");
        rolling = 1
        setTimeout(function () {
            rolling = 0;
        }, 5000);
    }
});
$('img').on('dragstart', function (event) { event.preventDefault(); });
$(".winner").on("click", function () {
    if (rm_enabled == 1) {
        roulette_sound.pause();
        roulette_sound.currentTime = 0;
        roulette_sound.volume = .5;
    }
    $(".sp_name p").css("opacity", "0");
    $(".winner_sp").css("opacity", "0");
    $(".sp_icon").css("opacity", "0");
    $(".ctr").css("opacity", "1");
    $(".roulette").remove();
    $(".winner").before("<div class=\"roulette\" style=\"display:none;\"></div>");
    for (brawler in brawlers) {
        $(".roulette").append("<img src=\"img/" + brawlers[brawler] + ".png\"/>")
    }
    $(".winner").css({ "transform": "translate(-50%, -50%) scale(1)", "visibility": "hidden" });
    setTimeout(function () {
        $(".hideIt").css({ "opacity": "0", "visibility": "hidden", "z-index": "1" });
    }, 100);
    setTimeout(function () {
        $(".sp_name p").css({ "opacity": "1", "right": "-100%" });
        $(".winner_sp").css({ "opacity": "1", "transform": "translate(50%, -50%) scale(0)" });
        $(".sp_icon").css({ "opacity": "1", "transform": "translate(50%, -50%) scale(0)" });
    }, 1500);
    $('div.roulette').roulette(option);
    $('img').on('dragstart', function (event) { event.preventDefault(); });
    $('div.roulette').on("click", function () {
        if (rolling == 0) {
            $('div.roulette').roulette("start");
            rolling = 1
            setTimeout(function () {
                rolling = 0;
            }, 5000);
        }
    })
});

$(".sawrapper").on("click", function () {
    brawlers = all_brawlers.slice();
    $(".select_brawler").removeClass("unselected");
});

$(".dawrapper").on("click", function () {
    $(".select_brawler").addClass("unselected");
    brawlers = [];
    $(".brawler .container .checkbox").prop('checked', false);
});

$(".qswrapper").on("click", function () {
    $(".qs_bg").css("display", "block");
});

$(".qs_close").on("click", function () {
    $(".qs_bg").css("display", "none");
});


$(".scroller").mousedown(function () {
    $(this).mousemove(function () {
        scrolling = 1;
    });
}).mouseup(function () {
    $(this).unbind('mousemove');
}).mouseout(function () {
    $(this).unbind('mousemove');
});

$("#br_remove").on("click", function () {
    if (br_remove == 1) {
        br_remove = 0;
        $(this).removeClass("opt_on");
        $(this).addClass("opt_off");
        $(this).text("OFF")
    } else {
        br_remove = 1;
        $(this).removeClass("opt_off");
        $(this).addClass("opt_on");
        $(this).text("ON")
    }
    menu_click_sound.play();
})

$("#br_voice_play").on("click", function () {
    if (br_voice_play == 1) {
        br_voice_play = 0;
        $(this).removeClass("opt_on");
        $(this).addClass("opt_off");
        $(this).text("OFF")
    } else {
        br_voice_play = 1;
        $(this).removeClass("opt_off");
        $(this).addClass("opt_on");
        $(this).text("ON")
    }
    menu_click_sound.play();
})

$("#sfx_enabled").on("click", function () {
    if (sfx_enabled == 1) {
        sfx_enabled = 0;
        $(this).removeClass("opt_on");
        $(this).addClass("opt_off");
        $(this).text("OFF");
        menu_click_sound.volume = 0;
        menu_back_sound.volume = 0;
        sp_sfx.volume = 0;
    } else {
        sfx_enabled = 1;
        $(this).removeClass("opt_off");
        $(this).addClass("opt_on");
        $(this).text("ON");
        menu_click_sound.volume = .3;
        menu_back_sound.volume = .3;
        sp_sfx.volume = .5;
    }
    menu_click_sound.play();
});

$("#rolling_music").on("click", function () {
    if (rm_enabled == 1) {
        rm_enabled = 0;
        $(this).removeClass("opt_on");
        $(this).addClass("opt_off");
        $(this).text("OFF");
        roulette_sound.volume = 0;
    } else {
        rm_enabled = 1;
        $(this).removeClass("opt_off");
        $(this).addClass("opt_on");
        $(this).text("ON");
        roulette_sound.volume = .5;
    }
    menu_click_sound.play();
});

$("#fs_mode").on("click", function () {
    if (fs_enabled == 1) {
        fs_enabled = 0;
        $(this).removeClass("opt_on");
        $(this).addClass("opt_off");
        $(this).text("OFF");
        document.exitFullscreen();
    } else {
        fs_enabled = 1;
        $(this).removeClass("opt_off");
        $(this).addClass("opt_on");
        $(this).text("ON");
        document.body.requestFullscreen();
    }
    menu_click_sound.play();
});

$("#brawler_menu").on("click", function () {
    menu_click_sound.play();
    $(".brawlers").css("opacity", "1");
    $(".starpowers").css("visibility", "hidden");
    $(".about").css("display", "none");
    $(".options").css("display", "none");
    $(".brawler_wrapper p").not(".quicksetuph").text("BRAWLERS");
    $(".br_options").css("display", "block");
    $(".selected_menu").css("top", "-10px");
})

$("#setting_menu").on("click", function () {
    menu_click_sound.play();
    $(".brawlers").css("opacity", "0");
    $(".starpowers").css("visibility", "hidden");
    $(".about").css("display", "none");
    $(".options").css("display", "block");
    $(".brawler_wrapper p").not(".quicksetuph").text("SETTINGS");
    $(".br_options").css("display", "none");
    $(".selected_menu").css("top", "46px");
})

$("#info_menu").on("click", function () {
    menu_click_sound.play();
    $(".brawlers").css("opacity", "0");
    $(".starpowers").css("visibility", "hidden");
    $(".options").css("display", "none");
    $(".about").css("display", "block");
    $(".brawler_wrapper p").not(".quicksetuph").text("ABOUT");
    $(".br_options").css("display", "none");
    $(".selected_menu").css("top", "102px");
})

function isToday(someDate) {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}