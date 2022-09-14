import './styles.css';
import './board.js';
import './pieces.js';
import './i18n.js';

function determineLegionStats(legion_level) {
    if (legion_level < 0) {
        return 'error'
    }

    if (legion < 2000) {
        //here dont even optimize, point them towards hyper stat calculator
    }

    var legion_rank = Math.floor(legion_level / 500) * 500;

    if (legion_rank > 10000) {
        legion_rank = 10000
    }
    var attacker_data = {
        500: 9,
        1000: 10,
        1500: 11,
        2000: 12,
        2500: 13,
        3000: 18,
        3500: 19,
        4000: 20,
        4500: 21,
        5000: 22,
        5500: 27,
        6000: 28,
        6500: 29,
        7000: 30,
        7500: 31,
        8000: 36,
        8500: 37,
        9000: 38,
        9500: 39,
        10000: 40,
        10500: 41,
        11000: 42,
        11500: 43,
        12000: 44,
        12500: 45
    }

    var number_of_attackers = attacker_data[legion_rank]

    var legion_stats = Math.floor(legion_level / 1000) * 1000;

    if (legion_stats > 6000) {
        legion_stats = 6000
    }

    var block_data = {
        1000: [0, 0],
        2000: [6, 1],
        3000: [13, 2],
        4000: [21, 3],
        5000: [30, 4],
        6000: [40, 5]
    }

    var blocks_per_stat = block_data[legion_stats][0]
    var layers_unlocked = block_data[legion_stats][1]

    localStorage.setItem('blocksPerStat', JSON.stringify(blocks_per_stat));
    localStorage.setItem('layersUnlocked', JSON.stringify(layers_unlocked))
    //var currentPieces = JSON.parse(localStorage.getItem('currentPieces')); //here avoid using local storage


    return {
        number_of_attackers: number_of_attackers,
        blocks_per_stat: blocks_per_stat,
        layers_unlocked: layers_unlocked,
        //blocks_to_fill: currentPieces
    }

}

document.getElementById('legionLevel').addEventListener('change', function () {
    var legion_level = document.getElementById('legionLevel').value;
    localStorage.setItem('legion_level', JSON.stringify(legion_level));
    var legion_stats = determineLegionStats(legion_level);
    
    if (parseInt(document.getElementById('hasLab').value) > 0){
        var lab_pieces = parseInt(document.getElementById('hasLab').value);
        var total_attackers = legion_stats.number_of_attackers + ' (+' + lab_pieces + ' free Lab piece)';
    }
    else{
        var total_attackers = legion_stats.number_of_attackers;
    }
    localStorage.setItem('total_attackers', JSON.stringify(total_attackers));
    document.getElementById('totalAttackersValue').innerText = `${total_attackers}`;
    //console.log (legion_stats);
})

document.getElementById('critBonus').addEventListener('change', function () {
    if (parseInt(document.getElementById('critBonus').value) >= 0) {
        var legion_bonus = parseInt(document.getElementById('critBonus').value);
        var hyper_bonus = parseInt(document.getElementById('critRate').innerHTML);

        var current_crit_bonus = legion_bonus + hyper_bonus;

        document.getElementById('current_crit_bonus').value = current_crit_bonus;
    }
});

document.getElementById('hasLab').addEventListener('change', function () {
    var legion_level = document.getElementById('legionLevel').value;
    var legion_stats = determineLegionStats(legion_level);
    if (parseInt(document.getElementById('hasLab').value) > 0){
        var lab_pieces = parseInt(document.getElementById('hasLab').value);
        var total_attackers = legion_stats.number_of_attackers + ' (+' + lab_pieces + ' free Lab piece)';
    }
    else{
        var total_attackers = legion_stats.number_of_attackers;
    }
    localStorage.setItem('total_attackers', JSON.stringify(total_attackers));
    document.getElementById('totalAttackersValue').innerText = `${total_attackers}`;
});

document.getElementById('critRateSelect').addEventListener('change', function () {
    var legion_bonus = parseInt(document.getElementById('critBonus').value);
    var hyper_bonus = parseInt(document.getElementById('critRate').innerHTML);

    var current_crit_bonus = legion_bonus + hyper_bonus;

    document.getElementById('current_crit_bonus').value = current_crit_bonus;

});

document.addEventListener("DOMContentLoaded", function () {
    // if (document.getElementById('liveSolve').checked == false) {
    //     document.getElementById('liveSolve').click();
    //     document.getElementById('liveSolve').checked = true;
    // }

    // if (document.getElementById('darkMode').checked == false) {
    //     document.getElementById('darkMode').click();
    //     document.getElementById('darkMode').checked = true;
    // }
    // document.getElementById('liveSolve').disabled = true;
    // document.getElementById('darkMode').disabled = true;

    // if(localStorage.getItem('total_attackers')){
    //     console.log('got it')
    //     console.log(JSON.parse(localStorage.getItem('total_attackers')))
    //     var total_attackers = JSON.parse(localStorage.getItem('total_attackers'));
    //     document.getElementById('totalAttackersValue').innerText = `${total_attackers}`;
    // }

});
