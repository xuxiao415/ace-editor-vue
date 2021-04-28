<template>
  <div class="ace-container">
    <div ref="aceEditor" class="ace-editor" />

    <div v-show="toggle" class="config-panel">
      <div>
        <div class="item">
          <label class="title">皮肤</label>
          <el-select v-model="themePath" class="value" size="mini" value-key="name" @change="handleThemeChange">
            <el-option
              v-for="t in themeArray"
              :key="t.name"
              :label="t.name"
              :value="t.path"
            />
          </el-select>
        </div>
        <div class="item">
          <label class="title">语言</label>
          <el-select v-model="modePath" class="value" size="mini" value-key="name" @change="handleModelPathChange">
            <el-option
              v-for="m in modeArray"
              :key="m.name"
              :label="m.name"
              :value="m.path"
            />
          </el-select>
        </div>
        <div class="item">
          <label class="title">换行</label>
          <el-select v-model="wrap" class="value" size="mini" value-key="name" @change="handleWrapChange">
            <el-option
              v-for="w in wrapArray"
              :key="w.name"
              :label="w.name"
              :value="w.value"
            />
          </el-select>
        </div>
      </div>
    </div>

    <div class="bookmarklet" @click="toggleConfigPanel" />
  </div>
</template>

<script>
/**
 * 引自：https://blog.csdn.net/YoshinoNanjo/article/details/82978668
 */
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/text'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'
import 'element-ui/lib/theme-chalk/select.css'
import 'element-ui/lib/theme-chalk/option.css'
import { Select, Option } from 'element-ui'
const wrapArray = [{
  name: '开启',
  value: true
}, {
  name: '关闭',
  value: false
}]

const themeArray = [{
  name: 'github',
  path: 'ace/theme/github'
}, {
  name: 'monokai',
  path: 'ace/theme/monokai'
}, {
  name: 'eclipse',
  path: 'ace/theme/eclipse'
}]

const modeArray = [{
  name: 'JavaScript',
  path: 'ace/mode/javascript'
}, {
  name: 'HTML',
  path: 'ace/mode/html'
}, {
  name: 'CSS',
  path: 'ace/mode/css'
}, {
  name: 'SCSS',
  path: 'ace/mode/scss'
}, {
  name: 'Json',
  path: 'ace/mode/json'
}, {
  name: 'XML',
  path: 'ace/mode/xml'
}, {
  name: 'Java',
  path: 'ace/mode/java'
}, {
  name: 'Text',
  path: 'ace/mode/text'
}]

export default {
  name: 'AceEditor',
  components: {
    ElSelect: Select,
    ElOption: Option
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      aceEditor: null,
      toggle: false,
      wrap: true,
      themePath: 'ace/theme/github',
      modePath: 'ace/mode/json',
      modeArray: modeArray,
      wrapArray: wrapArray,
      themeArray: themeArray
    }
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.aceEditor, {
      maxLines: 20, // 最大行数，超过会自动出现滚动条
      minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      fontSize: 14, // 编辑器内字体大小
      theme: this.themePath, // 默认设置的主题
      mode: this.modePath, // 默认设置的语言模式
      tabSize: 4, // 制表符设置为 4 个空格大小
      value: this.value ? this.value : '',
      wrap: this.wrap
    })
    // 激活自动提示
    this.aceEditor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    })
    this.aceEditor.getSession().on('change', this.change)
  },
  methods: {
    toggleConfigPanel() {
      this.toggle = !this.toggle
    },
    change() {
      this.$emit('change', this.aceEditor.getSession().getValue())
    },
    handleModelPathChange(modelPath) {
      this.aceEditor.getSession().setMode(modelPath)
    },
    handleWrapChange(wrap) {
      this.aceEditor.getSession().setUseWrapMode(wrap)
    },
    handleThemeChange(theme) {
      this.aceEditor.setTheme(theme)
    }
  }

}
</script>

<style lang='scss' scoped>
.ace-container {
  position: relative;

  .config-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100%;
    overflow: scroll;
    box-shadow: grey -5px 2px 3px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1;

    .item {
      margin: 10px auto;
      text-align: center;

      .title {
        color: #606266;
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }

  .bookmarklet {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    z-index: 2;
    cursor: pointer;
    border-width: 15px;
    border-style: solid;
    border-color: lightblue gray gray rgb(206, 173, 230);
    border-image: initial;
  }
}
</style>
