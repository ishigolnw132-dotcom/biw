import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
export default defineConfig({root:'firebase-web',publicDir:resolve('public'),plugins:[react()],resolve:{alias:{'@':resolve('.')}},build:{outDir:resolve('firebase-dist'),emptyOutDir:true,chunkSizeWarningLimit:1500,rollupOptions:{output:{manualChunks(id){if(id.includes('@babylonjs'))return 'babylon';if(id.includes('/blockly'))return 'blockly';}}}}});
