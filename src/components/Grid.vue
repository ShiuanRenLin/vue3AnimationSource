<template>
  <div class="grid-container">
    <!-- 網格 -->
    <div class="grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
      <!-- 使用 gridTemplateColumns 來設置每行的格子數 -->
      <div v-for="rowIndex in gridSize" :key="'row-' + rowIndex" class="row">
        <div v-for="cellIndex in gridSize" :key="'cell-' + cellIndex" class="cell">
          <!-- 每個格子的內容，包含CSS動畫 -->
          <div class="cell-content">
            <!-- 應用動畫效果 -->
            <div
              :class="['border', { 'animate': shouldDisplayCell(rowIndex - 1, cellIndex - 1) }, { 'reset-animation': resetAnimation }]"
              :style="{ borderWidth: borderWidth + 'px' }"
            >
              <div class="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 格子數量切換按鈕 -->
    <div class="controls size">
      <button @click="setGridSize(1)">1x1</button>
      <button @click="setGridSize(3)">3x3</button>
      <button @click="setGridSize(5)">5x5</button>
      <button @click="setGridSize(10)">10x10</button>
    </div>
    <!-- 顯示模式切換按鈕 -->
    <div class="controls mode">
      <label>
        <input type="radio" v-model="displayMode" value="All">
        All
      </label>
      <label>
        <input type="radio" v-model="displayMode" value="Random">
        Random
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridAnimation',
  data() {
    return {
      gridSize: 1, // 預設網格大小為1x1
      displayMode: 'All', // 預設顯示模式
      randomCells: [], // 用於存儲隨機選擇的格子
      resetAnimation: false, // 控制動畫重置的狀態
    };
  },
  computed: {
    // 計算列數，即每行有多少個格子
    columnCount() {
      return this.gridSize;
    },
    // 計算行數，即總共有多少行
    rowCount() {
      return this.gridSize;
    },
    // 根據 gridSize 計算 border 寬度
    borderWidth() {
      return Math.max(0.1, 5 - (this.gridSize / 10) * 5);
    },
  },
  methods: {
    // 設置網格大小
    setGridSize(size) {
      this.gridSize = size;
      this.selectRandomCells();
      this.resetAnimationState(); // 設置重置動畫狀態
    },
    // 設置顯示模式
    setDisplayMode(mode) {
      this.displayMode = mode;
      this.selectRandomCells();
      this.resetAnimationState(); // 設置重置動畫狀態
    },
    // 隨機選擇格子
    selectRandomCells() {
      this.randomCells = [];
      if (this.displayMode === 'Random') {
        const totalCells = this.gridSize * this.gridSize;

        for (let i = 0; i < totalCells; i++) {
          // 使用 Math.random() 生成隨機數，當隨機數小於 0.5 時，將格子 i 添加到 randomCells 中
          if (Math.random() < 0.5) {
            this.randomCells.push(i);
          }
        }
      }
    },
    // 決定是否顯示特定格子的光線動畫
    shouldDisplayCell(rowIndex, cellIndex) {
      if (this.displayMode === 'All') {
        return true;
      }
      if (this.displayMode === 'Random') {
        const cellIndexInGrid = rowIndex * this.gridSize + cellIndex;
        return this.randomCells.includes(cellIndexInGrid);
      }
      return false;
    },
    // 設置重置動畫狀態
    resetAnimationState() {
      this.resetAnimation = true; // 啟動重置動畫狀態

      // 50 毫秒後將重置動畫狀態設置回 false，以便重新啟動動畫
      setTimeout(() => {
        this.resetAnimation = false;
      }, 50);
    },
  },
  mounted() {
    this.selectRandomCells();
  },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.controls {
  margin-bottom: 10px;
}
.controls.mode {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.controls.size {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.controls label {
  margin: 0 10px;
}
.controls button {
  margin: 0 5px;
}
.grid {
  display: grid;
  gap: 0; /* 調整整個網格的間隔為0 */
  width: 320px; /* 固定整體網格的寬度 */
  height: 320px; /* 固定整體網格的高度 */
  margin: 20px 0; /* 上下留出20px的間距 */
}

.row {
  display: grid; /* 每行使用 grid 布局 */
  gap: 0; /* 調整每行中格子之間的間隔為0 */
}
.cell {
  width: 100%; /* 每個格子佔滿父容器寬度 */
  height: 100%; /* 每個格子的高度 */
  background-color: black; /* 背景色為黑色 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin: 0; /* 清除 margin */
  padding: 0; /* 清除 padding */
}

.cell-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0; /* 清除 margin */
  padding: 0; /* 清除 padding */
}

/* 新增的CSS樣式，應用到框框的動畫效果 */
@property --rotate {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.border {
  width: calc(100%); /* 讓border元素充滿cell的寬度，考慮到border的2px和內部content的2px */
  height: calc(100%); /* 讓border元素充滿cell的高度，考慮到border的2px和內部content的2px */
  margin: auto;
  position: relative;
  overflow: hidden;
  background: gray;
  border: 1px solid black; /* 邊框寬度將根據邏輯動態設置 */
  border-radius: 10px; /* 添加內部內容的圓角 */
  box-sizing: border-box; /* 保證寬度和高度包括邊框 */
}

.border.animate {
  background: gray;
  background-image: repeating-conic-gradient(
    from var(--rotate),
    #eeeeee 0%, 
    #eeeeee 10%, 
    transparent 10%, 
    transparent 50%
  );
  animation: rotating 2s linear infinite; /* 自動運行動畫 */
}

.border .content {
  position: absolute;
  width: calc(100% - 2px); /* 調整內部content的寬度 */
  height: calc(100% - 2px); /* 調整內部content的高度 */
  top: 1px;
  left: 1px;
  background-color: black; /* 正方形內部背景色改為黑色 */
  border-radius: 10px; /* 添加內部內容的圓角 */
}

.border::after {
  position: absolute;
  inset: 2px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: black;
}

.border.no-animation {
  animation: none !important; /* 禁用動畫 */
}

.reset-animation {
  animation: none !important; /* 重置動畫 */
}

@keyframes rotating {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

@media (max-width: 768px) {
  .grid {
    width: 240px; /* 在小屏幕下調整整體網格的寬度 */
    height: 240px; /* 在小屏幕下調整整體網格的高度 */
  }
}

@media (max-width: 480px) {
  .grid {
    width: 180px; /* 在更小屏幕下進一步調整整體網格的寬度 */
    height: 180px; /* 在更小屏幕下進一步調整整體網格的高度 */
  }
}
</style>
