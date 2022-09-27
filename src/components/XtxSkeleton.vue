<!-- src/components/XtxSkeleton.vue -->
<script lang="ts" setup>
    withDefaults(
      defineProps<{
        bg?: string;
        width?: string;
        height?: string;
        animated?: "scroll" | "fade";
      }>(),
      { bg: "#efefef", width: "100px", height: "100px", animated: "scroll" }
    );
    </script>
    
    <template>
      <div class="xtx-skeleton" :style="{ width, height, backgroundColor: bg }" :class="animated"></div>
    </template>
    
    <style scoped lang="less">
    .xtx-skeleton {
      display: inline-block;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
    }
    @keyframes scroll {
      0% {
        left: -100%;
      }
      100% {
        left: 120%;
      }
    }
    @keyframes fade {
      from {
        opacity: 0.2;
      }
      to {
        opacity: 1;
      }
    }
    .scroll {
      &::after {
        content: "";
        position: absolute;
        animation: scroll 1.5s ease 0s infinite;
        top: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(
          to left,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        transform: skewX(-45deg);
      }
    }
    .fade {
      animation: fade 1s linear infinite alternate;
    }
    </style>
    