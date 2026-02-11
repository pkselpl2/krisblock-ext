import type { EntryBlock } from '../types'
import type { Scope } from '../types/entry'
import type { EntityObject } from '../types/class/entity'

/* 색상 */
const KRIS_COLOR = {
  default: '#7CDB9C',
  darken: '#5FBF84',
};

/* iframe 생성 */
function getKrisIframe(): HTMLIFrameElement {
  let iframe = document.getElementById('kris_iframe') as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'kris_iframe';
    iframe.style.position = 'fixed';
    iframe.style.left = '0';
    iframe.style.top = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.zIndex = '9999';
    iframe.style.display = 'none';
    iframe.allow = 'fullscreen';
    document.body.appendChild(iframe);
  }
  return iframe;
}

/* 블록 정의 (JS 원본 그대로 + TS 타입 적용) */
const krisBlocks: EntryBlock[] = [

  {
    name: 'kris_iframe_show',
    template: 'iframe %1 보이기',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['https://playentry.org'] }],
    paramsKeyMap: { URL: 0 },
    class: 'text',
    func: (sprite: EntityObject, script: Scope) => {
      const iframe = getKrisIframe();
      iframe.src = script.getValue('URL', script);
      iframe.style.display = 'block';
    },
  },

  {
    name: 'kris_iframe_hide',
    template: 'iframe 숨기기',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      const iframe = document.getElementById('kris_iframe') as HTMLIFrameElement | null;
      if (iframe) iframe.style.display = 'none';
    },
  },

  {
    name: 'kris_iframe_opacity',
    template: 'iframe 투명도 %1 %',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'number' }],
    def: [{ type: 'number', params: [100] }],
    paramsKeyMap: { OP: 0 },
    class: 'text',
    func: (sprite: EntityObject, script: Scope) => {
      getKrisIframe().style.opacity = script.getValue('OP', script) / 100;
    },
  },

];
},
},
/* iframe 클릭 차단 */
{
name: 'kris_iframe_block_click',
template: 'iframe 클릭 차단',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => {
getKrisIframe().style.pointerEvents = 'none';
},
},
/* iframe 클릭 통과 */
{
name: 'kris_iframe_allow_click',
template: 'iframe 클릭 통과',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => {
getKrisIframe().style.pointerEvents = 'auto';
},
},
/* 웹사이트 열기 */
{
name: 'kris_open_website',
template: '웹사이트 %1 열기',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{ type: 'Block', accept: 'string' }],
def: [{ type: 'text', params: ['https://playentry.org'] }],
paramsKeyMap: { URL: 0 },
class: 'text',
func: (sprite, script) => {
window.open(script.getValue('URL', script), '_blank');
},
},
/* 작품 정지 */
{
name: 'kris_project_stop',
template: '작품 정지하기',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => {
if(Entry.engine) Entry.engine.toggleStop();
},
},
/* 작품 시작 */
{
name: 'kris_project_start',
template: '작품 시작하기',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => {
if(Entry.engine) Entry.engine.toggleRun();
},
},
/* 엔트리 alert */
{
name: 'kris_alert',
template: '%1 알림',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{ type: 'Block', accept: 'string' }],
def: [{ type: 'text', params: ['안녕하세요'] }],
paramsKeyMap: { MSG: 0 },
class: 'text',
func: (sprite, script) => {
alert(script.getValue('MSG', script));
},
},
/* 크레딧 */
{
name: 'kris_credit',
template: '%1',
color: EntryStatic.colorSet.common.TRANSPARENT,
skeleton: 'basic_text',
params: [{
type: 'Text',
text: '이 블록은 GPT와 크리스가 만들었습니다',
color: EntryStatic.colorSet.common.TEXT,
align: 'center',
}],
def: [],
paramsKeyMap: {},
class: 'text',
},
/* === 비공식 블록 추가 === */
/* 1️⃣ 터보모드 체크 */
{
name: 'kris_turbo_check',
template: '터보모드가 켜져 있는가?',
skeleton: 'basic_boolean_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => Entry.isTurbo === true,
},
/* 2️⃣ 터보모드 켜기/끄기 */
{
name: 'kris_turbo_set',
template: '부스트 모드 %1',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{
type: 'Dropdown',
options: [['켜기','true'], ['끄기','false']],
}],
def: [{ type:'dropdown', params:['true','true'] }],
paramsKeyMap: { MODE: 0 },
class: 'text',
func: (sprite, script) => {
Entry.isTurbo = script.getValue('MODE', script) === 'true';
},
},
/* 3️⃣ 오늘 요일 */
{
name: 'kris_today_day',
template: '오늘 요일',
skeleton: 'basic_string_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => ['일','월','화','수','목','금','토'][new Date().getDay()],
},
/* 4️⃣ 페이지 새로고침 */
{
name: 'kris_reload',
template: '엔트리 페이지 새로고침하기',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => location.reload(),
},
/* 5️⃣ 모바일 환경 확인 */
{
name: 'kris_is_mobile',
template: '모바일 환경인가?',
skeleton: 'basic_boolean_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => /Mobi|Android/i.test(navigator.userAgent),
},
/* 6️⃣ 엔트리 애셋 URL 가져오기 */
{
name: 'kris_get_asset_url',
template: '%1 엔트리 애셋 파일 가져오기',
skeleton: 'basic_string_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{ type:'Block', accept:'string' }],
def: [{ type:'text', params:[''] }],
paramsKeyMap: { ID:0 },
class: 'text',
func: (sprite, script) => {
const id = script.getValue('ID', script);
const asset = Entry.storage?.asset?.getAsset(id);
return asset ? asset.fileurl : '';
},
},
/* 7️⃣ 애셋 존재 확인 */
{
name: 'kris_asset_exist',
template: '%1 애셋이 존재하는가?',
skeleton: 'basic_boolean_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{ type:'Block', accept:'string' }],
def: [{ type:'text', params:[''] }],
paramsKeyMap: { ID:0 },
class: 'text',
func: (sprite, script) => !!Entry.storage?.asset?.getAsset(script.getValue('ID', script)),
},
/* 8️⃣ 전체화면 상태 확인 */
{
name: 'kris_is_fullscreen',
template: '전체화면 상태인가?',
skeleton: 'basic_boolean_field',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [],
def: [],
paramsKeyMap: {},
class: 'text',
func: () => !!document.fullscreenElement,
},
/* 9️⃣ 전체화면 켜기/끄기 */
{
name: 'kris_fullscreen_set',
template: '전체화면 %1',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{
type:'Dropdown',
options:[['켜기','on'],['끄기','off']],
}],
def: [{ type:'dropdown', params:['켜기','켜기'] }],
paramsKeyMap: { MODE:0 },
class: 'text',
func: (sprite, script) => {
const mode = script.getValue('MODE', script);
if(mode==='on') document.documentElement.requestFullscreen?.();
else document.exitFullscreen?.();
},
},
/* 🔟 애셋을 iframe에 바로 띄우기 */
{
name: 'kris_iframe_asset',
template: 'iframe에 애셋 %1 띄우기',
skeleton: 'basic',
color: KRIS_COLOR.default,
outerLine: KRIS_COLOR.darken,
params: [{ type:'Block', accept:'string' }],
def: [{ type:'text', params:[''] }],
paramsKeyMap: { ID:0 },
class: 'text',
func: (sprite, script) => {
const id = script.getValue('ID', script);
const asset = Entry.storage?.asset?.getAsset(id);
if(!asset) return;
const iframe = getKrisIframe();
iframe.src = asset.fileurl;
iframe.style.display='block';
},
},
/
];
