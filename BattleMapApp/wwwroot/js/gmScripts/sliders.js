let fogSlider = document.getElementById('fogSlider');
let fogSliderValue = +(fogSlider.value); //implicit cast to number, sliders' values are strings!

fogSlider.addEventListener('input', fogSliderFunction);

function fogSliderFunction() {
    fogSliderValue = +(fogSlider.value); //implicit cast to number, sliders' values are strings!
}

export { fogSliderValue };