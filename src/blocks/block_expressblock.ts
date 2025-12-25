import type { EntryBlock } from '../types'
import type { Scope } from '../types/entry'
import type { EntityObject } from '../types/class/entity'

type Blocks = {
  name: string
  template?: string
  color: {
    default: string
    darken?: string
  }
  params?: unknown[]
  def?: unknown
  map?: Record<string, number>
  class?: string
  func?(sprite: EntityObject, script: Scope): unknown
  skeleton?: string
}[]

export function getBlocks() {
  const blocks: Record<string, EntryBlock> = {}
  const arr = getExpressBlocks()

  for (const {
    name,
    template,
    color,
    params,
    def,
    map,
    class: cls = 'default',
    func,
    skeleton = 'basic',
  } of arr) blocks[name] = {
    color: color.default,
    outerLine: color.darken,
    skeleton,
    statements: [],
    params,
    events: {},
    def: {
      params: def,
      type: name,
    },
    paramsKeyMap: map,
    class: cls,
    func,
    template,
  }

  return blocks
}

export const name = 'ExpressBlock'
export const title = {
  ko: '특급',
  en: 'Express',
}

export const setLanguage = () => ({})

export const blockMenuBlocks = [
  'ExpressBlock_Webblocks',
  'ExpressBlock_OpenUrl',
  'ExpressBlock_OpenUrlSafeMode',
  'ExpressBlock_SetPageTitle',
  'ExpressBlock_GetPageTitle',
  'ExpressBlock_OpenUserPage',
  'ExpressBlock_OpenUserPage2',
  'ExpressBlock_Getminute2',
  'ExpressBlock_Getsecond2',
  'ExpressBlock_JsonBlocks',
  'ExpressBlock_Get',
  'ExpressBlock_GetString',
  'ExpressBlock_JsonKey',
  'ExpressBlock_StringToJSON',
  'ExpressBlock_FindUserBlocked',
  'ExpressBlock_FindUserBlockedVar',
  'ExpressBlock_FindUserDes',
  'ExpressBlock_FindUserRole',
  'ExpressBlock_FindUserGroup',
  'ExpressBlock_Post',
  'ExpressBlock_SaveProject',
  'ExpressBlock_EntryLogin',
  'ExpressBlock_UserFollow',
  'ExpressBlock_UsernameToID',
  'ExpressBlock_NicknameToID',
  'ExpressBlock_RecentFollowId',
  'ExpressBlock_UserUnFollow',
  'ExpressBlock_JsonHelpBlocks',
  'ExpressBlock_EntryDiscussFreeJSONHelp',
  'ExpressBlock_SearchBlocks',
  'ExpressBlock_SearchGoogle',
  'ExpressBlock_SearchEntryCommunityFree',
  'ExpressBlock_SearchEntryCommunityTips',
  'ExpressBlock_SearchEntryCommunityQna',
  'ExpressBlock_ConsoleBlocks',
  'ExpressBlock_Console',
  'ExpressBlock_ConsoleClear',
  'ExpressBlock_StartJS',
  'ExpressBlock_JSalert',
  'ExpressBlock_JSprompt',
  'ExpressBlock_JSconfirm',
  'ExpressBlock_BoostModeBlocks',
  'ExpressBlock_BoostMode',
  'ExpressBlock_EventBlocks',
  'ExpressBlock_EventWhenMouseClicked',
  'ExpressBlock_EventWhenSceneStart',
  'ExpressBlock_ValueBlocks',
  'ExpressBlock_ChangeVar',
  'ExpressBlock_ChangeEntryVar',
  'ExpressBlock_AddEntryListArray',
  'ExpressBlock_ChangeEntryListArray',
  'ExpressBlock_DELETEEntryListArray',
  'ExpressBlock_FindEntryListArray',
  'ExpressBlock_BlockFindChange',
  'ExpressBlock_CopytoClipboard',
  'ExpressBlock_GetBrowser',
  'ExpressBlock_DangerBlocks',
  'ExpressBlock_LoopAlert',
  'ExpressBlock_DeleteAllMyProject',
  'ExpressBlock_DeleteAllMyFreeDiscuss',
  'ExpressBlock_DeleteAllMyTipDiscuss',
  'ExpressBlock_DeleteAll',
  'ExpressBlock_Copy',
]

// 클립보드 복사 함수
function copy(val: string) {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = val;
	dummy.select();
	try {
		document.execCommand("copy");
	}
	catch {
		alert('복사하기를 지원하지 않습니다.');
	}
	finally {
		document.body.removeChild(dummy);
	}
}

const getExpressBlocks = (): Blocks => [
	{
		name: 'ExpressBlock_Webblocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Web',
				color: EntryStatic.colorSet.common.TEXT,
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_OpenUrl',
		template: '%1 사이트 열기(일반)%2',
		skeleton: 'basic',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['https://playentry.org']
			},
			null
		],
		map: {
			WEBSITE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open(script.getStringValue('WEBSITE', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_OpenUrlSafeMode',
		template: '%1 사이트 열기(안전모드)%2',
		skeleton: 'basic',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['https://playentry.org']
			},
			null
		],
		map: {
			WEBSITESAFEMODE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			if (confirm(script.getValue('WEBSITESAFEMODE', script) + ' 사이트를 열려 합니다. 여시겠습니까?')) {
				open(script.getStringValue('WEBSITESAFEMODE', script));
			}
			else {
				alert('사용자가 취소를 클릭하여 열기가 취소되었습니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_SetPageTitle',
		template: '페이지 제목을 %1로 바꾸기%2',
		skeleton: 'basic',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			PAGETITLE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			document.title = script.getStringValue('PAGETITLE', script);
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_GetPageTitle',
		template: '페이지 제목',
		skeleton: 'basic_string_field',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			let pagetitle = document.title;
			return pagetitle;
		},
	},
	{
		name: 'ExpressBlock_OpenUserPage',
		template: '%1 유저의 마이페이지 열기%2',
		skeleton: 'basic',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			},
			null
		],
		map: {
			USERNAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://playentry.org/' + script.getValue('USERNAME', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_OpenUserPage2',
		template: '%1 ID 유저의 마이페이지 열기%2',
		skeleton: 'basic',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['6048d5081ac9ea100d19c942']
			},
			null
		],
		map: {
			USERNAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://playentry.org/profile/' + script.getValue('USERNAME', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_Getminute2',
		template: '현재 2자리 분',
		skeleton: 'basic_string_field',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
		func: async () => {
			let today1 = new Date();
			let minutes = today1.getMinutes();
			// if (minutes < 10) {
			// 	minutes = "0" + minutes;
			// }
			// return minutes;
      return (minutes + '').padStart(2, '0')
		},
	},
	{
		name: 'ExpressBlock_Getsecond2',
		template: '현재 2자리 초',
		skeleton: 'basic_string_field',
		color: {
			default: '#15b01a',
			darken: '#15b01a'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
		func: async () => {
			let today2 = new Date();
			let seconds = today2.getSeconds();
			// if (seconds < 10) {
			// 	seconds = "0" + seconds;
			// }
			// return seconds;
      return (seconds + '').padStart(2, '0')
		},
	},
	{
		name: 'ExpressBlock_JsonBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Json',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_Get',
		template: '%1 가져오기 (GET)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['https://playentry.org/api/discuss/findNotice']
			}
		],
		map: {
			APIURL: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let res = await fetch(script.getStringValue('APIURL', script));
			let data = await res.json();
			return data;
		},
	},
	{
		name: 'ExpressBlock_GetString',
		template: '%1 가져오기 (GET) & string 형식 변환',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['https://playentry.org/api/discuss/findNotice']
			}
		],
		map: {
			APIURLTOSTRING: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let Stringres = await fetch(script.getStringValue('APIURLTOSTRING', script));
			let StringData = await Stringres.json();
			let StringDataToString = JSON.stringify(StringData);
			return StringDataToString;
		},
	},
	{
		name: 'ExpressBlock_JsonKey',
		template: 'JSON %1 의 %2 항목',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`{ "title": "Hello, world!" }`]
			},
			{
				type: 'text',
				params: ['title']
			}
		],
		map: {
			JSON: 0,
			KEY: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			let json = JSON.parse(script.getStringValue('JSON', script));
			let done = json[script.getStringValue('KEY', script)];
			return done;
		},
	},
	{
		name: 'ExpressBlock_StringToJSON',
		template: '%1 내용을 JSON으로 변환',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`{ "title": "Hello, world!" }`]
			}
		],
		map: {
			STRINGTOJSON: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let StringToJSON = JSON.parse(script.getStringValue('STRINGTOJSON', script));
			return StringToJSON;
		},
	},
	{
		name: 'ExpressBlock_FindUserBlocked',
		template: '%1 유저는 영구정지되었는가?(작동 안됨)',
		skeleton: 'basic_boolean_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['62045']
			}
		],
		map: {
			USERBLOCKEDNAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let blockedres = await fetch('https://playentry.org/api/getUserByusername/' + script.getValue('USERBLOCKEDNAME', script));
			let blockeddata = await blockedres.json();
			let blockedjson = eval(blockeddata);
			let blockeddone = blockedjson['isBlocked'];
			return blockeddone;
		},
	},
	{
		name: 'ExpressBlock_FindUserBlockedVar',
		template: '%1 유저는 영구정지되었는가?(작동 안됨)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			}
		],
		map: {
			USERBLOCKEDNAMEVAR: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let blockedres = await fetch('https://playentry.org/api/getUserByusername/' + script.getValue('USERBLOCKEDNAMEVAR', script));
			let blockeddata = await blockedres.json();
			let blockedjson = eval(blockeddata);
			let blockeddone = blockedjson['isBlocked'];
			return blockeddone;
		},
	},
	{
		name: 'ExpressBlock_FindUserDes',
		template: '%1 유저의 설명(작동 안됨)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			}
		],
		map: {
			USERDESNAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let desres = await fetch('https://playentry.org/api/getUserByusername/' + script.getValue('USERDESNAME', script));
			let desdata = await desres.json();
			let desjson = eval(desdata);
			let desdone = desjson['description'];
			return desdone;
		},
	},
	{
		name: 'ExpressBlock_FindUserRole',
		template: '%1 유저의 역할(작동 안됨)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			}
		],
		map: {
			USERROLENAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let roleres = await fetch('https://playentry.org/api/getUserByusername/' + script.getValue('USERROLENAME', script));
			let roledata = await roleres.json();
			let rolejson = eval(roledata);
			let roledone = rolejson['role'];
			return roledone;
		},
	},
	{
		name: 'ExpressBlock_FindUserGroup',
		template: '%1 유저의 기본 학급(작동 안됨)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			}
		],
		map: {
			USERGROUPNAME: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let groupres = await fetch('https://playentry.org/api/getUserByusername/' + script.getValue('USERGROUPNAME', script));
			let groupdata = await groupres.json();
			let groupjson = eval(groupdata);
			let groupdone = groupjson['primaryGroup'];
			return groupdone;
		},
	},
	{
		name: 'ExpressBlock_Post',
		template: '%1에 %2 POST 요청 보내기%3',
		skeleton: 'basic',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['https://playentry.org/api/discuss']
			},
			{
				type: 'text',
				params: ['{ "images": [], "category": "free", "title": "제목", "content": "내용", "groupNotice": false }']
			},
			null
		],
		map: {
			APIURL: 0,
			DATA: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			let res = await fetch(script.getStringValue('APIURL', script), {
				method: 'POST',
				body: script.getStringValue('DATA', script),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_SaveProject',
		template: '이 작품 저장하기(작동 안됨) %1',
		skeleton: 'basic',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if (Entry.projectId != "underfinded") {
				await fetch(script.getStringValue('APIURL', script), {
					method: 'PUT',
					body: '{ "isOpen": true }',
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			else {
				alert('작품이 저장되지 않은 상태입니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_EntryLogin',
		template: '엔트리 계정 로그인하기 아이디 %1 비밀번호 %2 %3',
		skeleton: 'basic',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['ID']
			},
			{
				type: 'text',
				params: ['PW']
			},
			null
		],
		map: {
			USERNAME: 0,
			PASSWORD: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			var username = script.getValue('USERNAME', script);
			var password = script.getValue('PASSWORD', script);
			var remember = false;
			await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
				query: `mutation(
					$username: String!
					$password: String!
					$rememberme: Boolean
					$captchaValue: String
					$captchaKey: String
					$captchaType: String
				) {
					signinByUsername(
					username: $username
					password: $password
					rememberme: $rememberme
					captchaValue: $captchaValue
					captchaKey: $captchaKey
					captchaType: $captchaType
				) {
					id
					username
					nickname
					role
					isEmailAuth
					isSnsAuth
					isPhoneAuth
					studentTerm
					status {
						userStatus
					}
					profileImage {
						id
						name
						label {
							ko
							en
							ja
							vn
						}
						filename
						imageType
						dimension {
							width
							height
						}
						trimmed {
							filename
							width
							height
						}
					}
					banned {
						username
						nickname
						reason
						bannedCount
						bannedType
						projectId
						startDate
						userReflect {
							status
							endDate
						}
					}
					}
				}
				`,
				variables: { username, password, rememberme: remember },
				}),
			});
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_UserFollow',
		template: '%1 id 유저를 팔로우하기 %2',
		skeleton: 'basic',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['609e57516614e402de674cb6']
			},
			null
		],
		map: {
			USERNAMEFORFOLLOW: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			var id = script.getValue('USERNAMEFORFOLLOW', script);
			await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					query: `mutation FOLLOW($user: String) {
					follow(user: $user) {
						id
						user {
						id
						username
						nickname
						profileImage {
							id
							name
							label {
							ko
							en
							ja
							vn
							__typename
							}
							filename
							imageType
							dimension {
							width
							height
							__typename
							}
							trimmed {
							filename
							width
							height
							__typename
							}
							__typename
						}
						status {
							following
							follower
							__typename
						}
						__typename
						}
						follow {
						id
						username
						nickname
						profileImage {
							id
							name
							label {
							ko
							en
							ja
							vn
							__typename
							}
							filename
							imageType
							dimension {
							width
							height
							__typename
							}
							trimmed {
							filename
							width
							height
							__typename
							}
							__typename
						}
						status {
							following
							follower
							__typename
						}
						__typename
						}
						__typename
					}
					}
					`,
					operationName: 'FOLLOW',
					variables: {
					user: id,
					},
				}),
			});
			return script.callReturn();
		}
	},
	{
		name: 'ExpressBlock_UsernameToID',
		template: '%1 유저네임의 ID',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['entry62045']
			}
		],
		map: {
			USERNAMETOID: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			var username = script.getValue('USERNAMETOID', script);
			var id = (await (await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `
						query ($username: String) {
							user(username: $username) {
								id
							}
						}
					`,
					variables: { username: username }
				})
			})).json()).data.user.id;
			return id;
		},
	},
	{
		name: 'ExpressBlock_NicknameToID',
		template: '%1 닉네임의 ID',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['62045']
			}
		],
		map: {
			NICKNAMETOID: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			var nickname = script.getValue('NICKNAMETOID', script);
			var id = (await (await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `
						query ($nickname: String) {
							user(nickname: $nickname) {
								id
							}
						}
					`,
					variables: { nickname: nickname }
				})
			})).json()).data.user.id;
			return id;
		},
	},
	{
		name: 'ExpressBlock_RecentFollowId',
		template: '%1 id 유저의 마지막으로 팔로우 한 유저',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`10`]
			}
		],
		map: {
			USERNAMEFORRECENTFOLLOW: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let user = script.getValue("USERNAMEFORRECENTFOLLOW", script);
			let id = (await (await fetch("https://playentry.org/graphql", {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
				query: `
				query SELECT_FOLLOWINGS($user: String, $pageParam: PageParam, $searchAfter: JSON){
				followings(user: $user, pageParam: $pageParam, searchAfter: $searchAfter) {
				searchAfter
				list {
				id
				follow {
				id
				username
				nickname
				profileImage {
				id
				name
				label {
				ko
				en
				ja
				vn
				}
				filename
				imageType
				dimension {
				width
				height
				}
				trimmed {
				filename
				width
				height
				}
				}
				status {
				following
				follower
				}
				isFollow
				projects {
				id
				thumb
				name
				}
				}
				}
				}
				}
				`,
				variables: { user: user, pageParam: { display: 8 }}
				})
			})).json()).data.followings.list[0].follow.id;
			return id;
		},
	},
	{
		name: 'ExpressBlock_UserUnFollow',
		template: '%1 id 유저를 언팔로우하기 %2',
		skeleton: 'basic',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['10']
			},
			null
		],
		map: {
			USERNAMEFORUNFOLLOW: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let user = script.getValue('USERNAMEFORUNFOLLOW', script);
			await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				query: `
					mutation UNFOLLOW ($user: String) {
						unfollow(user: $user) {
							id
							id
							user {
								id
								username
								nickname
								profileImage {
									id
									name
									label {
										ko
										en
										ja
										vn
									}
									filename
									imageType
									dimension {
										width
										height
									}
									trimmed {
										filename
										width
										height
									}
								}
								status {
									following
									follower
								}
								isFollow
								projects {
									id
									thumb
									name
								}
							}
							id
							follow {
								id
								username
								nickname
								profileImage {
									id
									name
									label {
										ko
										en
										ja
										vn
									}
									filename
									imageType
									dimension {
										width
										height
									}
									trimmed {
										filename
										width
										height
									}
								}
								status {
									following
									follower
								}
								isFollow
								projects {
									id
									thumb
									name
								}
							}
						}
					}
				`,
				variables: { user: user }
				})
			});
			return script.callReturn();
		}
	},
	{
		name: 'ExpressBlock_JsonHelpBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Json Help',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_EntryDiscussFreeJSONHelp',
		template: '%1 제목과 %2 내용의 엔트리 이야기 POST JSON(작동 안됨)',
		skeleton: 'basic_string_field',
		color: {
			default: '#383838',
			darken: '#383838'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: ['제목']
			},
			{
				type: 'text',
				params: ['이 글은 특급 블럭으로 작성된 글입니다. 한 번 사용해보세요!']
			}
		],
		map: {
			DISCUSSFREETITLE: 0,
			DISCUSSFREECONTENT: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			let DiscussFreeJSON = '{ "images": [], "category": , "title": "${script.getValue("DISCUSSFREETITLE", script)}", "content": "${script.getValue("DISCUSSFREECONTENT", script)}", "groupNotice": false }'
			return DiscussFreeJSON;
		},
	},
	{
		name: 'ExpressBlock_SearchBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Search',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_SearchGoogle',
		template: '%1 내용을 구글에 검색하기%2',
		skeleton: 'basic',
		color: {
			default: '#33aa5f',
			darken: '#33aa5f'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			SEARCHRESULT: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://google.com/search?q=' + script.getValue('SEARCHRESULT', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_SearchEntryCommunityFree',
		template: '%1 내용을 엔트리 커뮤니티 엔트리 이야기에 검색하기%2',
		skeleton: 'basic',
		color: {
			default: '#33aa5f',
			darken: '#33aa5f'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			SEARCHRESULT1: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://playentry.org/ds#!/free?title=' + script.getValue('SEARCHRESULT1', script) + '&search_title=' + script.getValue('SEARCHRESULT1', script) + '&sort=created&rows=20&page=1');
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_SearchEntryCommunityTips',
		template: '%1 내용을 엔트리 커뮤니티 노하우&팁에 검색하기%2',
		skeleton: 'basic',
		color: {
			default: '#33aa5f',
			darken: '#33aa5f'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			SEARCHRESULT2: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://playentry.org/ds#!/tips?title=' + script.getValue('SEARCHRESULT2', script) + '&search_title=' + script.getValue('SEARCHRESULT2', script) + '&sort=created&rows=20&page=1');
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_SearchEntryCommunityQna',
		template: '%1 내용을 엔트리 커뮤니티 묻고답하기에 검색하기%2',
		skeleton: 'basic',
		color: {
			default: '#33aa5f',
			darken: '#33aa5f'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			SEARCHRESULT3: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			open('https://playentry.org/ds#!/qna?title=' + script.getValue('SEARCHRESULT3', script) + '&search_title=' + script.getValue('SEARCHRESULT3', script) + '&sort=created&rows=20&page=1');
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_ConsoleBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Console',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_Console',
		template: '%1 내용을 브라우저 콘솔에 %2 하기%3',
		skeleton: 'basic',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Dropdown',
				options: [
					['로그', 'log'],
					['경고', 'warn'],
					['오류', 'error'],
					['알림', 'info']
				],
				fontSize: 11,
				arrowColor: '#f78640',
				value: 'log'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`엔트리`]
			},
			null,
			null
		],
		map: {
			CONTENT: 0,
			TYPE: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			const act = script.getStringValue('TYPE', script)
			if (act == 'log' || act == 'warn' || act == 'error' || act == 'info') console[act](script.getValue('CONTENT', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_ConsoleClear',
		template: '브라우저 콘솔 모두 지우기%1',
		skeleton: 'basic',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			console.clear();
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_StartJS',
		template: '%1 코드를 실행하기%2',
		skeleton: 'basic',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`console.log('콘솔 출력');`]
			},
			null
		],
		map: {
			STARTJSCODE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			try {
				eval(script.getStringValue('STARTJSCODE', script));
			}
			catch (err) {
				alert('다음 오류가 발생하여 실행에 실패하였습니다. 내용: ' + err);
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_JSalert',
		template: '%1 내용의 alert 창 띄우기%2',
		skeleton: 'basic',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`Javascript alert() 함수입니다.`]
			},
			null
		],
		map: {
			MESSAGEVALUE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			alert(script.getValue('MESSAGEVALUE', script));
		},
	},
	{
		name: 'ExpressBlock_JSprompt',
		template: '%1 내용의 prompt 창 띄우기',
		skeleton: 'basic_string_field',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`내용을 입력하세요.`]
			}
		],
		map: {
			PROMPTVALUE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let promptvalue = prompt(script.getStringValue('PROMPTVALUE', script));
			return promptvalue;
		},
	},
	{
		name: 'ExpressBlock_JSconfirm',
		template: '%1 내용의 confirm 창에서 확인을 눌렀는가?',
		skeleton: 'basic_string_field',
		color: {
			default: '#d15000',
			darken: '#d15000'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`확인과 취소 중에서 선택하세요.`]
			}
		],
		map: {
			CONFIRMVALUE: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			let confirmvalue = confirm(script.getStringValue('CONFIRMVALUE', script));
			return confirmvalue;
		},
	},
	{
		name: 'ExpressBlock_BoostModeBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Boost Mode',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_BoostMode',
		template: '부스트 모드가 켜져 있는가?',
		skeleton: 'basic_boolean_field',
		color: {
			default: '#850bb5',
			darken: '#850bb5'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
    func: () => !!Entry.options.useWebGL,
	},
	{
		name: 'ExpressBlock_EventBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Event',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_EventWhenMouseClicked',
		template: '마우스를 클릭했을 때 이벤트 발생시키기%1',
		skeleton: 'basic',
		color: {
			default: '#e4e80e',
			darken: '#e4e80e'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
				Entry.engine?.fireEvent('mouse_clicked');
		},
	},
	{
		name: 'ExpressBlock_EventWhenSceneStart',
		template: '장면이 시작되었을 때 이벤트 발생시키기%1',
		skeleton: 'basic',
		color: {
			default: '#e4e80e',
			darken: '#e4e80e'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
				Entry.engine?.fireEvent('when_scene_start');
		},
	},
	{
		name: 'ExpressBlock_ValueBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Value',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_ChangeVar',
		template: '변수 %1 값을 %2 으로 변경%3',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`user.username`]
			},
			{
				type: 'text',
				params: ['entry']
			},
			null
		],
		map: {
			VARNAME: 0,
			VALUE: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			eval(`${script.getValue('VARNAME', script)} = '${script.getValue('VALUE', script)}'`);
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_ChangeEntryVar',
		template: '엔트리 변수 %1 값을 %2 으로 변경%3',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`변수`]
			},
			{
				type: 'text',
				params: ['0']
			},
			null
		],
		map: {
			ENTRYVARNAME: 0,
			ENTRYVALUE: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			const variable = Entry.variableContainer?.getVariableByName(script.getStringValue('ENTRYVARNAME', script))
			if (variable) variable.value_ = script.getValue('ENTRYVARVALUE', script);
			else throw TypeError()
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_AddEntryListArray',
		template: '엔트리 리스트 %1에 %2 추가하기%3',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`리스트`]
			},
			{
				type: 'text',
				params: ['0']
			},
			null
		],
		map: {
			ENTRYADDLISTNAME: 0,
			ENTRYADDLISTARRAY: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			const list = Entry.variableContainer?.getListByName(script.getStringValue('ENTRYADDLISTNAME', script))
			if (list) list.appendValue(script.getValue('ENTRYADDLISTARRAY', script));
			else throw TypeError()
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_ChangeEntryListArray',
		template: '엔트리 리스트 %1의 %2번째 항목을 %3 으로 변경%4',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`리스트`]
			},
			{
				type: 'text',
				params: ['1']
			},
			{
				type: 'text',
				params: ['0']
			},
			null
		],
		map: {
			ENTRYCHANGELISTNAME: 0,
			ENTRYCHANGELISTINDEX: 1,
			ENTRYCHANGELISTARRAY: 2
		},
		class: 'text',
		func: async (sprite, script) => {
			const ChangeList = Entry.variableContainer?.getListByName(script.getStringValue("ENTRYCHANGELISTNAME"));
			if (!ChangeList) throw TypeError()
			const ChangeIndex = script.getNumberValue("ENTRYCHANGELISTINDEX");
			const ChangeArray = script.getValue("ENTRYCHANGELISTARRAY");
			ChangeList.replaceValue(ChangeIndex, ChangeArray);
		},
	},
	{
		name: 'ExpressBlock_DELETEEntryListArray',
		template: '엔트리 리스트 %1의 모든 항목 삭제하기%2',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: [`리스트`]
			},
			null
		],
		map: {
			ENTRYDELETELISTNAME: 0,
		},
		class: 'text',
		func: async (sprite, script) => {
			const DeleteList = Entry.variableContainer?.getListByName(script.getStringValue("ENTRYDELETELISTNAME"));
			if (!DeleteList) throw TypeError()
			while(DeleteList.getArray().length > 0){
				DeleteList.deleteValue(1);
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_FindEntryListArray',
		template: '엔트리 리스트 %1에 %2가 포함되어 있을 때 그 위치',
		skeleton: 'basic_string_field',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Block',
				accept: 'string'
			}
		],
		def: [
			{
				type: 'text',
				params: [`리스트`]
			},
			{
				type: 'text',
				params: ['엔트리']
			}
		],
		map: {
			ENTRYFINDLISTNAME: 0,
			ENTRYFINDLISTSTRING: 1
		},
		class: 'text',
		func: async (sprite, script) => {
			if (!Entry.variableContainer) throw TypeError()
			let list = Entry.variableContainer.getListByName(script.getStringValue('ENTRYFINDLISTNAME', script));
			if (!list) {
				return null;
			}
			const arr = list.getArray();
			const data = script.getValue('ENTRYFINDLISTSTRING', script);
			for (let i = 0, len = arr.length; i < len; i++) {
				if (arr[i]!.data + '' == data + '') {
					return i + 1;
				}
			}
			return null;
		},
	},
	{
		name: 'ExpressBlock_BlockFindChange',
		template: '블럭 감지 활성화(비공식로딩 변수 값을 1로 변경)%1',
		skeleton: 'basic',
		color: {
			default: '#1dbfa1',
			darken: '#1dbfa1'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			const variable = Entry.variableContainer?.getVariableByName('비공식로딩')
			if (!variable) throw TypeError()
			variable.value_ = 1;
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_CopytoClipboard',
		template: '%1 내용을 클립보드에 복사하기%2',
		skeleton: 'basic',
		color: {
			default: '#00b6b1',
			darken: '#00b6b1'
		},
		params: [
			{
				type: 'Block',
				accept: 'string'
			},
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			{
				type: 'text',
				params: ['엔트리']
			},
			null
		],
		map: {
			TEXTTOCOPY: 0
		},
		class: 'text',
		func: async (sprite, script) => {
			copy(script.getStringValue('TEXTTOCOPY', script));
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_GetBrowser',
		template: '브라우저 이름',
		skeleton: 'basic_string_field',
		color: {
			default: '#00b6b1',
			darken: '#00b6b1'
		},
		params: [],
		def: [],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			return Entry.userAgent
		},
	},
	{
		name: 'ExpressBlock_DangerBlocks',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Danger',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	},
	{
		name: 'ExpressBlock_LoopAlert',
		template: 'alert 함수 무한반복하기%1',
		skeleton: 'basic',
		color: {
			default: '#FF0000',
			darken: '#FF0000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if(confirm('alert 함수 무한반복을 실행하시겠습니까?')) {
				while (true) {
					alert('당신은 이 사이트에 갇혔습니다.');
				}
			}
		},
	},
	{
		name: 'ExpressBlock_DeleteAllMyProject',
		template: '자신의 모든 작품 삭제(작동 안됨) %1',
		skeleton: 'basic',
		color: {
			default: '#FF0000',
			darken: '#FF0000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if(confirm('자신의 모든 작품 삭제 블럭을 실행하시겠습니까?')) {
				if (!user) throw TypeError()
				$.get(`https://playentry.org/api/project/find?user=${user._id}`, get => { get.data.forEach((project: { _id: any }) => { fetch(`https://playentry.org/api/project/${project._id}`, { method: 'DELETE' }) }) });
				alert('자신의 모든 작품이 삭제되었습니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_DeleteAllMyFreeDiscuss',
		template: '자신의 모든 엔트리 이야기 글 삭제(작동 안됨) %1',
		skeleton: 'basic',
		color: {
			default: '#FF0000',
			darken: '#FF0000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if(confirm('자신의 모든 엔트리 이야기 글 삭제 블럭을 실행하시겠습니까?')) {
				if (!user) throw TypeError()
				$.get(`https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=free`, d => d.data.forEach(({ _id }: { _id: any }) => $.ajax({ url: "https://playentry.org/api/discuss/" + _id, type: "DELETE" })));
				alert('자신의 모든 엔트리 이야기 글이 삭제되었습니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_DeleteAllMyTipDiscuss',
		template: '자신의 모든 노하우&팁 글 삭제(작동 안됨) %1',
		skeleton: 'basic',
		color: {
			default: '#FF0000',
			darken: '#FF0000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if(confirm('자신의 모든 노하우&팁 글 삭제 블럭을 실행하시겠습니까?')) {
				if (!user) throw TypeError()
				$.get(`https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=tips`, d => d.data.forEach(({ _id }: { _id: any }) => $.ajax({ url: "https://playentry.org/api/discuss/" + _id, type: "DELETE" })));
				alert('자신의 모든 노하우&팁 글이 삭제되었습니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_DeleteAll',
		template: '초심으로 돌아가기(작동 안됨) %1',
		skeleton: 'basic',
		color: {
			default: '#FF0000',
			darken: '#FF0000'
		},
		params: [
			{
				type: 'Indicator',
				img: 'block_icon/start_icon_play.svg',
				size: 11,
			}
		],
		def: [
			null
		],
		map: {},
		class: 'text',
		func: async (sprite, script) => {
			if(confirm('초심으로 돌아가기 블럭을 실행하시겠습니까?')) {
				if (!user) throw TypeError()
				$.get(`https://playentry.org/api/project/find?user=${user._id}`, get => { get.data.forEach((project: { _id: any }) => { fetch(`https://playentry.org/api/project/${project._id}`, { method: 'DELETE' }) }) });
				$.get(`https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=free`, d => d.data.forEach(({ _id }: { _id: any }) => $.ajax({ url: "https://playentry.org/api/discuss/" + _id, type: "DELETE" })));
				$.get(`https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=tips`, d => d.data.forEach(({ _id }: { _id: any }) => $.ajax({ url: "https://playentry.org/api/discuss/" + _id, type: "DELETE" })));
				$.get(`https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=qna`, d => d.data.forEach(({ _id }: { _id: any }) => $.ajax({ url: "https://playentry.org/api/discuss/" + _id, type: "DELETE" })));
				alert('자신의 모든 작품, 엔트리 이야기 글, 노하우&팁 글, 묻고답하기 글이 삭제되었습니다.');
			}
			return script.callReturn();
		},
	},
	{
		name: 'ExpressBlock_Copy',
		template: '%1',
		skeleton: 'basic_text',
		color: {
			default: EntryStatic.colorSet.common.TRANSPARENT,
			darken: EntryStatic.colorSet.common.TRANSPARENT
		},
		params: [
			{
				type: 'Text',
				text: 'Made by 62045, using EntBlocks',
				color: EntryStatic.colorSet.common.TEXT,
				class: 'bold',
				align: 'center'
			}
		],
		def: [],
		map: {},
		class: 'text'
	}
]
