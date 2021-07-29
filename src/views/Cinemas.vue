<template>
  <div>
    <div>
      <p>Load from Firebase:</p>
      <input type="file" accept="image/*">
    </div>
    <div>
      <img class="preview">
      <br>
      <button @click="uploadBytes">Unload</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fs } from '../main'

export default {
  methods: {
    uploadBytes() {
      const ref = fs.ref().child('images/space.jpg');

      // [START storage_upload_bytes]
      var bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
      ref.put(bytes).then((snapshot) => {
        console.log('Uploaded an array!');
      });
      var message = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
      ref.putString(message, 'base64url').then((snapshot) => {
        console.log('Uploaded a base64url string!');
      });
      // [END storage_upload_bytes]
      const deleteItem = fs.ref().child('First try')
      deleteItem.delete().then(() => {
        console.log('Delete succesfully')
      }).catch((e)=>{
        console.log('Something wrong')
      })
    }
  } 
}
</script>
