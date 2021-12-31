/* 
封装思路

面向对象函数, 使用 this.data 可不需要传参, 围绕 data

纯操作函数: 同步或异步的, 不操作本组件数据, 不调用本组件方法, (尽量) 

纯操作 函数单次操作 + 参数
纯操作 函数批量操作 + 参数


存在异步返回 promise, 
异步纯操作 还需要考虑 , 并行, 还是一次等待顺序执行


功能能点,尽量小, 但注意拆分合理, 

层层递进,层层封装

功能描述:

选任务, 绘制

*/

var vm = {

  created() { },
  data: {

    taskIdList: [], // 勾选的.
    taskIdListBak: [], // 已绘制的, taskListDraw

  },
  methods: {

    change_task_table_selected_U() {

      this.taskChanged_debounce();

    },

    taskChanged_debounce() {
      this.taskChanged();
    },

    taskChanged() {

      const taskIdListBak = this.taskIdListBak;
      const taskIdList = this.taskIdList;
      let { add, sub } = this.diffArr(taskIdListBak, taskIdList);

      sub.forEach((taskId) => {
        this.clearLine(taskId)
      });

      add.forEach((taskId) => {
        this.drawLine(taskId)
      });

      this.taskIdListBak = [].concat(taskIdList)

    },
    // 画轨迹, 逻辑处理, 数据
    drawLine_LD(taskId) {
      //  前置操作 后置操作

      // 数据
      const taskIdList = this.taskIdList;

      // 校验: 
      if (!taskIdList.includes(taskId)) {
        console.log('不存在任务');
        return;
      }

      // 核心操作

      this.drawLine(taskId);

      // 后置
      this.taskIdListBak.push(taskId);

    },
    drawLine(taskId) {
      console.log('绘制轨迹:', taskId);
    },
    drawLine_taskList(taskIdList) {
      taskIdList.forEach(id => {
        this.drawLine(id)
      })
    },

    // 清除轨迹
    clearLine(taskId) {
      console.log('清除轨迹:', taskId);
    },
    clearLine_p(taskId) {
      return new Promise(res => {
        setTimeout(() => {
          console.log('清除轨迹:', taskId);
          return res()
        }, 0);
      })
    },
    // 异步: 批量 并行 清除
    clearLine_taskList_parallel_p(taskIdList) {
      let pArr = taskIdList.map(taskId => {
        return this.clearLine_p(taskId);
      })
      return Promise.all(pArr);
    },
    // 异步: 批量 依次 清除
    async clearLine_taskList_inTurn_p(taskIdList) {

      for (let i = 0; i < taskIdList.length; i++) {
        const taskId = taskIdList[i];
        await this.clearLine_p(taskId);
      }

      return;
    },



  },
}