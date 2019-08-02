import { fetchData } from '@/api'
// import { uidCode } from '@/utils/uidCode'
// import { currencyNumber, userType } from '@/utils/tdexMap'
// import { string62to10 } from "@/utils/uidCode";

export default {
  computed: {
    labelList: {
      get() {
        return this.$store.state.labelList
      },
      set(list) {
        this.$store.commit('UPDATE_LABEL_LIST', list)
      }
    },
    watchlabel: function () {
      return JSON.stringify(this.labelList)
    }
  },
  watch: {
    watchlabel(newVal, oldVal) {
      const newV = JSON.parse(newVal)
      const oldV = JSON.parse(oldVal)
      if (!newV.length && oldV.length && this.isSearch) {
        this.page = 1
        this.size = 10
        this.fetchTableData()
      }
    }
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      loading: false,
      isSearch: false,
      inputText: '',
      sizeList: [9, 18, 27],
    }
  },
  methods: {
    // 提交搜索
    submitSearch() {
      if (!this.searchUrl) {
        this.$message.info('该页面暂不支持搜索')
        return false
      }


      if (!this.isInputTextNull(this.dynamicTable)) {
        this.$message.info('请输入搜索内容')
        return false
      }
      // if (this.inputText) {
      //   this.addLabelList(this.inputText)
      //   return false
      // }
      // if (this.labelList.length) {
      this.isSearch = false
      this.fetchSearchData()
      this.searchHide()
      return false
      // }


    },
    isInputTextNull(item) {
      for (var v of item) {
        if (v.inputText != "") {
          return true
        }
      }
      return false
    },
    InputTextAllNull(item) {
      for (var v of item) {
        v.inputText = ""
      }
    },
    // 改变搜索标签列表
    changeLabelList(first, last) {
      const item = this.labelList.find(item => item.indexOf(first) !== -1)
      if (item) {
        let index = -1
        this.labelList.forEach(function (element, nuber) {
          const item = element.split(':')
          if (item[0] === first) {
            index = nuber
          }
        }, this)
        if (index !== -1) {
          this.labelList.splice(index, 1)
          this.labelList.push(first + ':' + last)
        }
      } else {
        this.labelList.push(first + ':' + last)
      }
      // this.inputText = ''
      this.InputTextAllNull(this.dynamicTable)
      this.fetchSearchData()
    },
    // 选择时间
    selectTime() {
      this.$refs.datePicker.showPicker()
    },
    // 选中时间
    datePickerChange(val) {
      // this.addLabelList(val[0] + '~' + val[1])
      var time = val[0] + '~' + val[1]
      // console.log(time)
      for (var v of this.dynamicTable) {
        if (v.name == "createTime") {
          this.$set(v, "inputText", time)
        }
      }
    },
    // 删除标签
    removeTags(index) {
      this.labelList.splice(index, 1)
    },

    // 获取搜索数据
    fetchSearchData() {
      this.loading = true
      // const params = this.formatLabelList()
      this.searchParams = {}
      for (var v of this.dynamicTable) {
        if (v.inputText == "" || v.inputText == null || v.inputText == undefined) {
          continue
        }
        if (v.name == "createTime") {
          v.handler(v.inputText)
          continue
        }
        // if (this.inputText) {
        //   this.addLabelList(this.inputText)
        //   return false
        // }
        // if (this.labelList.length) {
        // this.fetchSearchData()
        // return false
        // }

        if (v.inputText == null || v.inputText == undefined) {
          v.inputText = ""
        }
        v.inputText = v.inputText.replace(/(^\s*)|(\s*$)/g, "");
        var inputText = v.inputText

        if (v.handler) {
          inputText = v.handler(inputText)
        }
        this.searchParams[v.name] = inputText
      }

      if (!this.isSearch) {
        this.searchParams.page_no = 1
        this.searchParams.page_size = 10
      } else {
        this.searchParams.page_no = this.page
        this.searchParams.page_size = this.size
      }
      if (this.keyword && JSON.stringify(this.keyword) !== '{}') {
        Object.assign(this.searchParams, this.keyword)
      }
      fetchData(this.searchUrl, this.searchParams).then(data => {
        this.loading = false
        if (data && data.list && data.list.length) {
          if (!this.isSearch) {
            this.isSearch = true
            this.page = 1
            this.size = 10
          }
          if (data.totalAmount) {
            this.totalAmount = data.totalAmount
            this.totalTargetAmount = data.totalTargetAmount
          }
          this.total = data.total
          this.setTableData(data.list)
        } else {
          if (!this.isSearch) {
            this.isSearch = true
            this.page = 1
            this.size = 10
          }
          this.total = 0
          this.totalAmount = ""
          this.totalTargetAmount = ""
          this.setTableData([])
          this.$message.error('暂无相关内容')
        }
      })
    },
    async createdFun() {
      await this.fetchTableData()
    },

    // 获取表格数据
    fetchTableData() {
      this.loading = true
      const params = {
        page_no: this.page,
        page_size: this.size
      }
      if (this.param && JSON.stringify(this.param) !== '{}') {
        Object.assign(params, this.param)
      }
      fetchData(this.requestUrl, params).then(data => {
        this.loading = false
        if (data && data.list) {
          if (this.isSearch) {
            this.isSearch = false
          }
          this.total = data.total
          this.setTableData(data.list)
          this.totalAmount = ""
          this.totalTargetAmount = ""
        } else if (data.length) {
          if (this.isSearch) {
            this.isSearch = false
          }
          this.setTableData(data)
        }
      })
    },
    // 改变大小
    handleSize(val) {
      this.page = 1
      this.size = val
      if (!this.total) return
      this.isSearch ? this.fetchSearchData() : this.fetchTableData()
    },
    // 改变分页
    handlePage(val) {
      this.page = val
      this.isSearch ? this.fetchSearchData() : this.fetchTableData()
    },
    // 改变选中表格
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 合计统计
    getSummaries(param) {
      const { columns, data } = param

      const sums = []
      columns.forEach((column, index) => {

        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = this.multipleSelection.map(item =>
          Number(item[column.property])
        )
        if (this.filterSummaries.includes(column.property)) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },

    // 处理JSON数据
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },


  },

  created() {
    this.createdFun()

  },



  directives: {// 初始化指令
    clickOutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法

            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener('click', clickHandler);
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      },
    },
  }
}
