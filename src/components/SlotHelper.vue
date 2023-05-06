<template>
  <div>
    <h1>component 1</h1>
    <form>
      <div id="form-header">
        <slot name="msg1"></slot>
      </div>
      <div id="form-title">
        <slot name="msg2"></slot>
      </div>
      <div id="form-name">
        <slot name="msg3"></slot>
        <input type="text" name="name" placeholder="name" />
      </div>
      <div id="form-name">
        <slot name="msg4"></slot>
        <input type="text" name="username" placeholder="set username" />
      </div>
      <div id="form-password">
        <slot name="msg5"></slot>
        <input type="password" name="password" placeholder="set password" />
      </div>
    </form>
  </div>
</template>
<style scoped>
h1 {
  color: green;
}
h2 {
  color: purple;
}
h3 {
  color: red;
}
</style>
export default { components:{ }, data:(){ return { } }, methods:{ } }
