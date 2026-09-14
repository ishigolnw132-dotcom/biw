# CODE QUEST 3D

เกมวิทยาการคำนวณ ป.4 ภาษาไทย: Babylon.js, Blockly, React/TypeScript และ Firebase school backend

**เว็บโหมดฝึกเล่นพร้อมเพลงเปิดใช้งานได้ ส่วนระบบโรงเรียนออนไลน์ยังเป็น NOT READY จนกว่าจะเชื่อม Firebase จริงและตรวจรับผ่านครบ**

## มีอะไรในรุ่นนี้

- บทเรียนเริ่มต้น 0 และบทเรียน 1–20 ใน 3 โลก; Blockly ลาก ต่อ ซ้อน แก้ไขและดูโค้ดได้จริง
- Run / Step / Pause / Stop / Reset, ไฮไลต์บล็อก, กู้โปรแกรมและ execution cursor หลังเปิดใหม่
- GLB ต้นฉบับ 17 ไฟล์ ตัวละคร 3 แบบ มี skeleton 6 bones และ animation groups 12 ท่า พร้อม blending
- Babylon WebGL และ software 3D fallback ใช้ geometry เดียวกัน; กล้องหมุน ซูม ทิศ N/E/S/W
- เพลงต้นฉบับ 3 ชุดตามฉาก ปุ่มเปิด/ปิดเพลงและเอฟเฟกต์แยกกัน ปรับระดับเสียงและจำค่าได้
- เสียงคลิก เดิน เลี้ยว เก็บ/วางของ เริ่ม พัก หยุด คำใบ้ ผิดพลาด และผ่านภารกิจ
- ฝึกด้วย seed, พลังงาน, กุญแจ, ส่งของ, ลูป, Space/touch/broadcast/receive, บทพูดและ storyboard
- Local practice profiles, คะแนน ดาว XP badges, CSV และไฟล์โปรแกรม JSON; PWA asset cache

## ระบบโรงเรียนที่พัฒนาเพิ่ม

หน้า `/school` เชื่อม Firebase SDK และ callable backend จริง ไม่มีบัญชีหรือรายชื่อจำลองในหน้าผลิตภัณฑ์

- บัญชี admin/teacher/student; PIN นักเรียน scrypt hash, rate limit, immutable studentId, credential revocation
- ทะเบียน ห้อง ปี/ภาคเรียน enrollment นำเข้า CSV/Excel แบบ mapping/preview/batch/idempotent ย้ายห้อง ปิดใช้/คืนสถานะ ประวัติเดิม
- ห้องเกม/งานมอบหมาย 40 คน: same seed, countdown, pause/resume, lock, hints, leaderboard, new round
- คะแนนจาก replay บน server, เวลา/attempt/server ownership validation, transactional deduplication และ rankings
- AES-GCM cache แยก school/student/round, กู้ draft/attempt/cursor, คิวคะแนนและ workspace ส่งซ้ำเมื่อเชื่อมต่อ
- รายงานแบบแบ่งหน้าและ export ทุกหน้า รวมผู้ไม่เคยเล่นและบริบทห้อง/เทอมในอดีต
- วิเคราะห์ attempts/time/blocks/hints/errors และผู้ที่ลองหลายครั้งแล้วยังไม่ผ่าน; audit และ health
- สร้าง/แก้ mission เพิ่มได้ถึง ID 999; world, lesson/stage, objective, scene, grid 5–11, blocks, energy, random/obstacle/item rules, NPC, time, attempts, score/star rules
- แก้ชื่อโลกและชื่อโรงเรียน; เพิ่ม GLB character ที่มี skeleton/12 ท่าผ่าน Cloud Storage และเลือกใช้ใน mission

**โค้ด backend กับหน้าจอมีแล้ว แต่การ deploy frontend อย่างเดียวไม่ได้เปิด Firebase backend** โมเดลที่อัปโหลด บัญชี ห้องออนไลน์ และคะแนนโรงเรียนยังใช้งานบนลิงก์ที่ส่งมอบไม่ได้เมื่อ school config ยังปิดอยู่

## พัฒนาและตรวจ

ใช้ Node.js 22+ และ pnpm ตาม lockfile

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test:core
pnpm build:functions
pnpm build:firebase
```

Firebase Emulator ใช้ Java 21+ และโปรเจกต์ `demo-code-quest` เท่านั้น ดูคำสั่งและขอบเขตผลตรวจใน `docs/QA_STATUS.md`

## เปิดระบบโรงเรียน

อ่าน `docs/FIREBASE_SCHOOL.md` แล้วตั้งค่า Firebase Auth, Firestore, Functions, App Check และ Storage ในโปรเจกต์โรงเรียนของตนเอง ไม่ใส่ private key หรือรหัสผ่านลง source

`public/school-config.json` ตั้ง `enabled:false` ไว้จนกว่าจะมีค่าการเชื่อมต่อจริง และผ่านการทดสอบด้านสิทธิ์และอุปกรณ์แล้ว

ยังไม่รับรอง Final Acceptance ตาม Master Prompt: ต้องตรวจ callable transport/App Check บนระบบจริง, flow ครู–นักเรียนผ่านเบราว์เซอร์, Storage upload, offline/reconnect, และอุปกรณ์ WebGL/iOS/Android จริง

## โครงสร้างสำคัญ

- `components/game/` — เกม Blockly, rendering, audio settings และ execution flow
- `lib/game/` — curriculum, pure engine/solver, software rendering, audio และ practice storage
- `components/school/` — portal, room, student progress, mission/world/asset/settings editors
- `lib/school/` — Firebase client, contracts, mission validation/replay, encrypted cache, Excel/CSV
- `firebase/functions/src/` — callable entry, domain service และ scoped asset storage
- `firebase/` — rules, indexes, public config example
- `scripts/` — asset generation, bootstrap และ meaningful integration tests
- `firebase-web/` — static entrypoint จาก UI และ engine ชุดเดียวกัน
