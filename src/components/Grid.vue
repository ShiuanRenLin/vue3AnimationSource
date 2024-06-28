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
              :style="{ borderWidth: borderWidth + 'px', borderRadius: borderRadius + 'px' }"
            >
              <div class="content" :style="{ borderRadius: contentBorderRadius + 'px' }"></div>
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
    // 根據 gridSize 計算 border 圓角
    borderRadius() {
      return Math.max(0, 15 - (this.gridSize)); // 調整圓角大小
    },
    // 根據 gridSize 計算 content 內部圓角半徑
    contentBorderRadius() {
      return Math.max(0, 15 - (this.gridSize) - (1/this.gridSize)*5);
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

<style scoped src="../assets/Grid.css"></style>
