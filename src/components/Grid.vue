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
            <div :class="['border', { 'animate': shouldDisplayCell(rowIndex - 1, cellIndex - 1) }]">
              <div class="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顯示模式切換按鈕 -->
    <div class="controls">
      <label>
        <input type="radio" v-model="displayMode" value="All">
        All
      </label>
      <label>
        <input type="radio" v-model="displayMode" value="Random">
        Random
      </label>
    </div>
    <!-- 格子數量切換按鈕 -->
    <div class="controls">
      <button @click="setGridSize(1)">1x1</button>
      <button @click="setGridSize(3)">3x3</button>
      <button @click="setGridSize(5)">5x5</button>
      <button @click="setGridSize(10)">10x10</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridAnimation',
  data() {
    return {
      gridSize: 3, // 預設網格大小改為3x3
      displayMode: 'All', // 預設顯示模式
      randomCells: [], // 用於存儲隨機選擇的格子
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
  },
  methods: {
    // 設置網格大小
    setGridSize(size) {
      this.gridSize = size;
      this.selectRandomCells();
    },
    // 設置顯示模式
    setDisplayMode(mode) {
      this.displayMode = mode;
      this.selectRandomCells();
    },
    // 隨機選擇格子
    selectRandomCells() {
      this.randomCells = [];
      if (this.displayMode === 'Random') {
        const totalCells = this.gridSize * this.gridSize;
        const randomCount = Math.floor(totalCells / 2); // 隨機選擇一半的格子
        for (let i = 0; i < randomCount; i++) {
          const randomIndex = Math.floor(Math.random() * totalCells);
          this.randomCells.push(randomIndex);
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
  display: flex;
  flex-direction: column;
}
.controls button {
  margin-bottom: 5px;
}
.grid {
  display: grid;
  gap: 10px; /* 格子之間的間隔 */
  width: 320px; /* 固定整體網格的寬度 */
  height: 320px; /* 固定整體網格的高度 */
  margin: 20px 0; /* 上下留出20px的間距 */
}

.row {
  display: grid; /* 每行使用 grid 布局 */
  gap: 10px; /* 格子之間的間隔 */
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
}
.cell-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* 新增的CSS樣式，應用到框框的動畫效果 */
@property --rotate {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.border {
  width: 100%; /* 讓border元素充滿cell的寬度 */
  height: 100%; /* 讓border元素充滿cell的高度 */
  margin: auto;
  position: relative;
  overflow: hidden;
  background: gray;
  border: 2px solid black;
  border-radius: 10px; /* 添加內部內容的圓角 */
}
.border.animate {
  background: gray
  repeating-conic-gradient(
    from var(--rotate),
    #eeeeee 0%, 
    #eeeeee 5%, 
    transparent 5%, 
    transparent 50%
  );
  animation: rotating 2s linear infinite; /* 自動運行動畫 */
}
.border .content {
  position: absolute;
  width: 96%;
  height: 96%;
  top: 2px;
  left: 2px;
  background-color: black; /* 正方形內部背景色改為黑色 */
  border-radius: 10px; /* 添加內部內容的圓角 */
}
.border::after {
  content: "";
  position: absolute;
  inset: 4px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: black;
}

.border.no-animation {
  animation: none; /* 禁用動畫 */
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
