<template>
  <div class="circle-chart">
    <div class="circle-chart__container">
      <div class="radialProgressBar" :class="progressClass">
        <div class="overlay">
          <div v-if="label" class="overlay__label">{{ label }}</div>
          <div v-if="displayValue" class="overlay__value">{{ visualValue }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleChart",
  props: {
    label: String,
    displayValue: Number,
  },
  computed: {
    progressClass: function () {
      var css =
        this.displayValue
          ? "progress-" + String(Math.floor(this.displayValue))
          : "";
      return css;
    },
    visualValue: function() {
      return this.displayValue.toFixed(2);
    }
  }
};
</script>

<style scoped lang="scss">
$bar-colors: (rgb(76, 235, 51),rgb(249, 200, 39),rgb(211, 14, 50));
$base-color: #ddd;
$mask-color: #fff;

.circle-chart {
  position: relative;
  margin: 0;
  height: 0;
  padding: 100% 0 0;
  overflow: hidden;
  &__container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.radialProgressBar {
  border-radius: 50%;
  transform: translate(50%, 50%);
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $base-color;
  margin: 0;
  transition: all 200ms ease;

  .overlay {
    border-radius: 50%;
    width: 80%;
    height: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    background: $mask-color;
    text-align: center;
    line-height: 1.3;
    &__label {
      font-size: 1.5vw;
    }
    &__value {
      font-size: 2vw;
    }
  }
}
@for $i from 0 to 101 {
  $rotation: $i * 360 / 100;
  $bar-color: nth($bar-colors, 1);

  .progress-#{$i} {

    @if $i > 80 {
      $bar-color: nth($bar-colors, 3);
    }
    @else if ($i > 50) {
      $bar-color: nth($bar-colors, 2);
    }

    @if $i <= 50 {
      background-image: linear-gradient(90deg, $base-color 50%, transparent 50%),
        linear-gradient(#{$rotation - 90}deg, $base-color 50%, $bar-color 50%);
    } @else if $i < 100 {
      background-image: linear-gradient(
          #{$rotation + 90}deg,
          $bar-color 50%,
          transparent 50%
        ),
        linear-gradient(90deg, $base-color 50%, $bar-color 50%);
    } @else {
      background-image: linear-gradient(90deg, transparent 50%, $bar-color 50%),
        linear-gradient(90deg, $bar-color 50%, transparent 50%);
    }
  }
}
</style>