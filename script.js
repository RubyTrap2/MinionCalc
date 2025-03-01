function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number * decPlaces / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
}



window.onload = function(){
    const calculateBtn = document.getElementById('calculateBtn');
    const numMinionInput = document.getElementById('numMinionInput');
    const plasmaBucketCheckbox = document.getElementById('plasmaBucketCheckbox');
    const enchantedHopperCheckbox = document.getElementById('enchantedHopperCheckbox');
    const corruptSoilCheckbox = document.getElementById('corruptSoilCheckbox');

    calculateBtn.addEventListener('click', function(){
        const minionNum = numMinionInput.value;
        if (minionNum.length === 0){
            return;
        }
        const plasmaChecked = document.getElementById('plasmaBucketCheckbox').checked
        const hopperChecked = document.getElementById('enchantedHopperCheckbox').checked
        const soilChecked = document.getElementById('corruptSoilCheckbox').checked

        document.getElementById('bodyDiv').style.display = 'none'
        fetch('https://api.hypixel.net/skyblock/bazaar')
        .then(res => res.json())
        .then(data => {
            document.getElementById('resultDiv').style.display = 'flex'
            const plasmaPrice = [data.products.PLASMA_BUCKET.quick_status.sellPrice, data.products.PLASMA_BUCKET.quick_status.buyPrice];
            const hopperPrice = [data.products.ENCHANTED_HOPPER.quick_status.sellPrice, data.products.ENCHANTED_HOPPER.quick_status.buyPrice];
            const soilPrice = [data.products.CORRUPT_SOIL.quick_status.sellPrice, data.products.CORRUPT_SOIL.quick_status.buyPrice];
            const spreadingPrice = [data.products.DIAMOND_SPREADING.quick_status.sellPrice, data.products.DIAMOND_SPREADING.quick_status.buyPrice];
            const slimePrice = [data.products.SLIME_BALL.quick_status.sellPrice, data.products.SLIME_BALL.quick_status.buyPrice];
            const encSlimePrice = [data.products.ENCHANTED_SLIME_BALL.quick_status.sellPrice, data.products.ENCHANTED_SLIME_BALL.quick_status.buyPrice];
            const encBlockPrice = [data.products.ENCHANTED_SLIME_BLOCK.quick_status.sellPrice, data.products.ENCHANTED_SLIME_BLOCK.quick_status.buyPrice];
            
            console.log(slimePrice)

            var total = 0;

            document.getElementById('slimeballNum').textContent = `x${1072 * parseFloat(minionNum)}`;
            document.getElementById('slimeballPrice').textContent = abbrNum(1072 * parseFloat(minionNum) * parseFloat(slimePrice[1]), 1);
            total += 1072 * parseFloat(minionNum) * parseFloat(slimePrice[1]);

            document.getElementById('enchanted_slimeballNum').textContent = `x${992 * parseFloat(minionNum)}`;
            document.getElementById('enchanted_slimeballPrice').textContent = abbrNum(992 * parseFloat(minionNum) * parseFloat(encSlimePrice[0]), 1);
            total += 992 * parseFloat(minionNum) * parseFloat(encSlimePrice[0]);
            
            document.getElementById('enchanted_slime_blockNum').textContent = `x${8 * parseFloat(minionNum)}`;
            document.getElementById('enchanted_slime_blockPrice').textContent = abbrNum(8 * parseFloat(minionNum) * parseFloat(encBlockPrice[0]), 1);
            total += 8 * parseFloat(minionNum) * parseFloat(encBlockPrice[0]);
            
            if (plasmaChecked){
                document.getElementById('plasma_bucketNum').textContent = `x${1 * parseFloat(minionNum)}`;
                document.getElementById('plasma_bucketPrice').textContent = abbrNum(1 * parseFloat(minionNum) * parseFloat(plasmaPrice[0]), 1);
                total += 1 * parseFloat(minionNum) * parseFloat(plasmaPrice[0])
            }

            if (hopperChecked){
                document.getElementById('enchanted_hopperNum').textContent = `x${1 * parseFloat(minionNum)}`;
                document.getElementById('enchanted_hopperPrice').textContent = abbrNum(1 * parseFloat(minionNum) * parseFloat(hopperPrice[0]), 1);
                total += 1 * parseFloat(minionNum) * parseFloat(hopperPrice[0])
            }

            if (soilChecked){
                document.getElementById('corrupt_soilNum').textContent = `x${1 * parseFloat(minionNum)}`;
                document.getElementById('corrupt_soilPrice').textContent = abbrNum(1 * parseFloat(minionNum) * parseFloat(soilPrice[0]), 1);
                total += 1 * parseFloat(minionNum) * parseFloat(soilPrice[0])
            }

            document.getElementById('diamond_spreadingNum').textContent = `x${1 * parseFloat(minionNum)}`;
            document.getElementById('diamond_spreadingPrice').textContent = abbrNum(1 * parseFloat(minionNum) * parseFloat(spreadingPrice[1]), 1);
            total += 1 * parseFloat(minionNum) * parseFloat(spreadingPrice[1]);

            document.getElementById('total_coinsPrice').textContent = abbrNum(total, 1)
        })
    });
};
