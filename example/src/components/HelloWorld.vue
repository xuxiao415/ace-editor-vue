<template>
  <div>
    <ace-editor v-model="value"></ace-editor>
    <p>{{ value }}</p>
  </div>
</template>

<script>
//import AceEditor from './../../../dist/ace-editor.esm'
import AceEditor from './../../../src/ace-editor'

export default {
  name: 'HelloWorld',
  components: {
    AceEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      value: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
