<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { TextPlugin } from "gsap/dist/TextPlugin";
  import {SplitText} from "gsap/dist/SplitText";

    import RadialChart from '$lib/RadialChart.svelte';


   gsap.registerPlugin(TextPlugin);
   gsap.registerPlugin(SplitText);

   const sampleNodes = [
  {
    "Id":"Fionn mac cumhaill",
    "Label":"Fionn mac cumhaill",
    "Label_short":"Fionn",
    "group":"Clan Baoiscne",
    "about":"Fionn mac Cumhaill, the formidable leader of the Fianna and Clan Baoiscne, is a wise and valiant warrior whose magical insight often guides his decisions; however, his assertive leadership can occasionally lead to friction and discord within his ranks, particularly with figures like Diarmaid and Goll.",
    "phoentic_name":"Fionn mccool",
    "count":85
  },
  {
    "Id":"Oisín",
    "Label":"Oisín",
    "Label_short":"Oisín",
    "group":"Clan Baoiscne",
    "about":"Oisín, once a fierce warrior of the Fianna and son of Fionn mac Cumhaill, now stands as a solitary bridge between the mythic past and the Christian present, driven by a longing to recount the valorous deeds of his youth and ensure that the legacy of his vanished comrades endures through his tales to St. Patrick.",
    "phoentic_name":"Osheen",
    "count":40
  },
  {
    "Id":"Oscar",
    "Label":"Oscar",
    "Label_short":"Oscar",
    "group":"Clan Baoiscne",
    "about":"Oscar is a fierce and exceptionally skilled warrior driven by a desire to uphold the honor and valor of Clan Baoiscne, often showcasing his bravery alongside Goll as the most formidable members of the Fianna.",
    "phoentic_name":"Oscar",
    "count":25
  },
  {
    "Id":"Diarmaid",
    "Label":"Diarmaid",
    "Label_short":"Diarmaid",
    "group":"Clan Baoiscne",
    "about":"Diarmaid, an irresistible warrior of the Fianna, is driven by a blend of romantic impulsiveness and loyalty, yet is trapped by his enchanting love spot and his forbidden love for Gráinne, ultimately navigating a tragic path shadowed by Fionn's vengeance.",
    "phoentic_name":"jeermid",
    "count":21
  },
  {
    "Id":"Caoilte",
    "Label":"Caoilte",
    "Label_short":"Caoilte",
    "group":"Clan Baoiscne",
    "about":"Caoilte, a member of the Clan Baoiscne and the fleet-footed champion of the Fianna, is driven by a relentless dedication to his comrades, using his unparalleled swiftness to serve and preserve the legends of his kin as he recounts their glorious past to St. Patrick alongside Oisín.",
    "phoentic_name":"kweel-tehh",
    "count":17
  },
  {
    "Id":"Bran",
    "Label":"Bran",
    "Label_short":"Bran",
    "group":"Clan Baoiscne",
    "about":"Bran, Fionn's loyal and unparalleled hound born from a magical transformation, embodies fierce loyalty and martial prowess with a deep bond to Fionn, driven by a desire to protect and uphold the honor of the Fianna.",
    "phoentic_name":"Bron",
    "count":15
  },
  {
    "Id":"Faolan",
    "Label":"Faolan",
    "Label_short":"Faolan",
    "group":"Clan Baoiscne",
    "about":"Faolan, a minor yet loyal member of the Fianna and son of the legendary Fionn mac Cumhaill, is driven by a strong sense of duty to his clan, seeking both to uphold his family's honor and find his own place within the storied legacy of the warriors of Clan Baoiscne.",
    "phoentic_name":"fwaylawn",
    "count":5
  },
  {
    "Id":"Fearghas",
    "Label":"Fearghas",
    "Label_short":"Fearghas",
    "group":"Clan Baoiscne",
    "about":"Fearghas, a staunch and loyal member of Clan Baoiscne, is driven by his fierce loyalty to Fionn MacCumhaill, serving as his ambassador and standard bearer, proudly raising the Gal Gréine in battle, with a unique exemption from Fionn's command due to his origin from Jura, highlighting his courageous independence and commitment to the Fianna.",
    "phoentic_name":"Ferghas",
    "count":4
  },
  {
    "Id":"Caireall",
    "Label":"Caireall",
    "Label_short":"Caireall",
    "group":"Clan Baoiscne",
    "about":"Caireall, a contrarian and proud warrior of Clann Baoiscne, is driven by a fierce sense of honor and rivalry, leading to his fateful confrontation over coveted marrow bones with Goll, reflecting his inherent contentious nature and passion for asserting dominance.",
    "phoentic_name":"caril",
    "count":3
  },
  {
    "Id":"Cumhall",
    "Label":"Cumhall",
    "Label_short":"Cumhall",
    "group":"Clan Baoiscne",
    "about":"Cumhall, the determined and honorable former leader of the Fianna from Clan Baoiscne, was driven by his duty to protect his people and secure a legacy for his unborn son, Fionn, before his life was tragically cut short by his rival, Goll mac Morna.",
    "phoentic_name":"cool",
    "count":3
  },
  {
    "Id":"Iollann",
    "Label":"Iollann",
    "Label_short":"Iollann",
    "group":"Clan Baoiscne",
    "about":"Iollann, a steadfast warrior of the Clan Baoiscne in the Fianna, is motivated by a desire to uphold his clan's honor and legacy, often acting with loyalty and quiet strength in the shadow of more renowned heroes.",
    "phoentic_name":"ullin",
    "count":3
  },
  {
    "Id":"Goll mac morna",
    "Label":"Goll mac morna",
    "Label_short":"Goll",
    "group":"Clan Morna",
    "about":"Goll mac Morna, a formidable leader of Clan Morna, is a warrior whose complex blend of rivalry and occasional alliance with Fionn is driven by a quest for power, honor, and the resolution of past enmities, as evidenced by his renowned strength and the fateful slaying of Fionn's father, Cumhall.",
    "phoentic_name":"Gull mcMorna",
    "count":33
  },
  {
    "Id":"Conán",
    "Label":"Conán",
    "Label_short":"Conán",
    "group":"Clan Morna",
    "about":"Conán of Clan Morna, often known as Conán Maol, is a fiery and contentious member of the Fianna whose sharp wit and penchant for stirring conflict mask a keen desire to challenge authority and assert his own place in the legendary band.",
    "phoentic_name":"Cohnawn",
    "count":23
  },
  {
    "Id":"Garadh",
    "Label":"Garadh",
    "Label_short":"Garadh",
    "group":"Clan Morna",
    "about":"Garadh is a fiercely loyal member of Clan Morna, driven by a deep sense of duty and allegiance to his kin, often finding himself embroiled in the relentless rivalries and conflicts against the opposing Clan Baoiscne.",
    "phoentic_name":"kunn",
    "count":2
  },
  {
    "Id":"Foreign King",
    "Label":"Foreign King",
    "Label_short":"King",
    "group":"Enemy",
    "about":"The Foreign King, often driven by a desire for power and domination, masterminds invasions against Ireland or plots to ensnare the Fianna, showcasing his cunning and formidable nature rooted in the stronghold of Beirbhe.",
    "phoentic_name":"King",
    "count":19
  },
  {
    "Id":"Giant",
    "Label":"Giant",
    "Label_short":"Giant",
    "group":"Enemy",
    "about":"An enormous and formidable adversary, driven by a desire to challenge the prowess of the Fianna and disrupt their heroic exploits, often motivated by pride and a thirst for dominance.",
    "phoentic_name":"Giant",
    "count":6
  },
  {
    "Id":"Dearg",
    "Label":"Dearg",
    "Label_short":"Dearg",
    "group":"Enemy",
    "about":"Dearg, a formidable and ambitious foreign warrior from Greece, is driven by his desire for conquest and dominion over Ireland, but he ultimately meets his match in the valor of the Fianna and the prowess of Goll, leading to his defeat.",
    "phoentic_name":"darig",
    "count":4
  },
  {
    "Id":"Lon mac liobhain",
    "Label":"Lon mac liobhain",
    "Label_short":"Lon",
    "group":"Enemy",
    "about":"Lon mac Liobhain is a fearsome and masterful blacksmith whose sinister ambitions drive him to forge powerful weapons for the warriors of Lochlann, wielding his monstrous appearance and unparalleled skill to shape the destiny of battles through his creations.",
    "phoentic_name":"lun mclovin",
    "count":4
  },
  {
    "Id":"Ciuthach",
    "Label":"Ciuthach",
    "Label_short":"Ciuthach",
    "group":"Enemy",
    "about":"Ciuthach, driven by a relentless ambition to challenge the renowned Fianna and prove his strength, stands as a formidable foreign adversary fueled by a desire for conquest and recognition.",
    "phoentic_name":"keuhoc",
    "count":3
  },
  {
    "Id":"Lonndubh",
    "Label":"Lonndubh",
    "Label_short":"Lonndubh",
    "group":"Enemy",
    "about":"Lonndubh is a formidable and cunning warrior, driven by a relentless ambition to challenge the heroes of the Fenian cycle and prove his superiority in both strength and strategy.",
    "phoentic_name":"lunn duv",
    "count":3
  },
  {
    "Id":"St. Patrick",
    "Label":"St. Patrick",
    "Label_short":"St. Patrick",
    "group":"Other",
    "about":"St. Patrick is a determined and devout Christian missionary, driven by his fervent desire to convert Ireland to Christianity, yet open-minded enough to engage with and listen to the tales of the ancient Irish hero Oisín, which reflects his respect for the land's rich pagan traditions.",
    "phoentic_name":"St. Patrick",
    "count":17
  },
  {
    "Id":"Cormac mac airt",
    "Label":"Cormac mac airt",
    "Label_short":"Cormac",
    "group":"Other",
    "about":"Cormac mac Airt, the esteemed High King of Ireland, is a cunning and pragmatic ruler whose motivations oscillate between consolidating his power by opposing Fionn and the Fianna, and strategically allying with them when it serves to bolster the stability and security of his kingdom.",
    "phoentic_name":"Cormac mckart",
    "count":8
  },
  {
    "Id":"Gráinne",
    "Label":"Gráinne",
    "Label_short":"Gráinne",
    "group":"Other",
    "about":"Gráinne is a fiercely determined and passionate woman who defies expectations and follows her heart by eloping with Diarmaid, driven by love and the courage to challenge societal norms and authority, despite the turmoil and tragic consequences it brings.",
    "phoentic_name":"grawnyeh",
    "count":8
  },
  {
    "Id":"King of ireland",
    "Label":"King of ireland",
    "Label_short":"Irish King",
    "group":"Other",
    "about":"The King of Ireland in the Fenian tales is a composite figure, often depicted as a wise and authoritative leader whose motivation is to maintain peace and stability across the realm while upholding the honor and traditions of the land.",
    "phoentic_name":"King of ireland",
    "count":8
  },
  {
    "Id":"Tuatha dé danann",
    "Label":"Tuatha dé danann",
    "Label_short":"Tuatha",
    "group":"Other",
    "about":"The Tuatha Dé Danann are a mystical race driven by their desire to protect and maintain their sovereignty over Ireland, often using their supernatural abilities to influence events and form strategic alliances or enmities with mortal heroes like the Fianna.",
    "phoentic_name":"Tooha day danan",
    "count":5
  },
  {
    "Id":"Conn",
    "Label":"Conn",
    "Label_short":"Conn",
    "group":"Other",
    "about":"Conn, driven by a fervent desire for vengeance over his father's death, is a determined and passionate character whose quest ultimately mirrors his father's tragic fate at the hands of Goll.",
    "phoentic_name":"kunn",
    "count":3
  },
  {
    "Id":"Niamh Cinn Óir",
    "Label":"Niamh Cinn Óir",
    "Label_short":"Niamh",
    "group":"Other",
    "about":"Niamh Cinn Óir is a compelling and ethereal figure driven by love and longing, whose enchanting allure and deep affection for Oisín compel her to bridge worlds and time, drawing him away to the mystical Land of Youth, where her heart's desires dwell amidst eternity.",
    "phoentic_name":"neev keen orr",
    "count":3
  }
]
  // Sample edges (connections between nodes)
  const sampleEdges =
  [
  {
    "source":0,
    "target":1,
    "weight":28
  },
  {
    "source":0,
    "target":11,
    "weight":26
  },
  {
    "source":0,
    "target":2,
    "weight":20
  },
  {
    "source":1,
    "target":20,
    "weight":20
  },
  {
    "source":11,
    "target":1,
    "weight":19
  },
  {
    "source":0,
    "target":14,
    "weight":19
  },
  {
    "source":12,
    "target":0,
    "weight":17
  },
  {
    "source":3,
    "target":0,
    "weight":16
  },
  {
    "source":1,
    "target":2,
    "weight":14
  },
  {
    "source":5,
    "target":0,
    "weight":14
  },
  {
    "source":4,
    "target":0,
    "weight":14
  },
  {
    "source":12,
    "target":11,
    "weight":14
  },
  {
    "source":0,
    "target":20,
    "weight":11
  },
  {
    "source":3,
    "target":11,
    "weight":11
  },
  {
    "source":11,
    "target":2,
    "weight":10
  },
  {
    "source":12,
    "target":3,
    "weight":9
  },
  {
    "source":14,
    "target":11,
    "weight":9
  },
  {
    "source":4,
    "target":1,
    "weight":9
  },
  {
    "source":3,
    "target":2,
    "weight":8
  },
  {
    "source":0,
    "target":23,
    "weight":8
  },
  {
    "source":12,
    "target":1,
    "weight":8
  },
  {
    "source":21,
    "target":0,
    "weight":7
  },
  {
    "source":14,
    "target":2,
    "weight":7
  },
  {
    "source":14,
    "target":1,
    "weight":6
  },
  {
    "source":3,
    "target":1,
    "weight":6
  },
  {
    "source":3,
    "target":14,
    "weight":6
  },
  {
    "source":0,
    "target":15,
    "weight":6
  },
  {
    "source":2,
    "target":20,
    "weight":6
  },
  {
    "source":11,
    "target":20,
    "weight":6
  },
  {
    "source":4,
    "target":20,
    "weight":5
  },
  {
    "source":0,
    "target":22,
    "weight":5
  },
  {
    "source":6,
    "target":0,
    "weight":5
  },
  {
    "source":6,
    "target":1,
    "weight":5
  },
  {
    "source":4,
    "target":11,
    "weight":5
  },
  {
    "source":4,
    "target":2,
    "weight":5
  },
  {
    "source":6,
    "target":11,
    "weight":4
  },
  {
    "source":25,
    "target":1,
    "weight":4
  },
  {
    "source":3,
    "target":22,
    "weight":4
  },
  {
    "source":7,
    "target":0,
    "weight":4
  },
  {
    "source":6,
    "target":2,
    "weight":4
  },
  {
    "source":4,
    "target":6,
    "weight":4
  },
  {
    "source":0,
    "target":17,
    "weight":4
  },
  {
    "source":12,
    "target":14,
    "weight":4
  },
  {
    "source":14,
    "target":23,
    "weight":4
  },
  {
    "source":4,
    "target":14,
    "weight":4
  },
  {
    "source":14,
    "target":20,
    "weight":4
  },
  {
    "source":4,
    "target":3,
    "weight":3
  },
  {
    "source":9,
    "target":11,
    "weight":3
  },
  {
    "source":12,
    "target":2,
    "weight":3
  },
  {
    "source":5,
    "target":12,
    "weight":3
  },
  {
    "source":3,
    "target":7,
    "weight":3
  },
  {
    "source":16,
    "target":0,
    "weight":3
  },
  {
    "source":12,
    "target":13,
    "weight":3
  },
  {
    "source":16,
    "target":11,
    "weight":3
  },
  {
    "source":3,
    "target":20,
    "weight":3
  },
  {
    "source":3,
    "target":6,
    "weight":3
  },
  {
    "source":5,
    "target":1,
    "weight":3
  },
  {
    "source":21,
    "target":11,
    "weight":3
  },
  {
    "source":3,
    "target":24,
    "weight":3
  },
  {
    "source":8,
    "target":0,
    "weight":3
  },
  {
    "source":6,
    "target":20,
    "weight":3
  },
  {
    "source":7,
    "target":11,
    "weight":3
  },
  {
    "source":7,
    "target":1,
    "weight":3
  },
  {
    "source":7,
    "target":2,
    "weight":3
  },
  {
    "source":4,
    "target":7,
    "weight":3
  },
  {
    "source":4,
    "target":12,
    "weight":3
  },
  {
    "source":0,
    "target":19,
    "weight":3
  },
  {
    "source":25,
    "target":0,
    "weight":3
  },
  {
    "source":14,
    "target":15,
    "weight":3
  },
  {
    "source":12,
    "target":20,
    "weight":2
  },
  {
    "source":21,
    "target":3,
    "weight":2
  },
  {
    "source":18,
    "target":3,
    "weight":2
  },
  {
    "source":12,
    "target":17,
    "weight":2
  },
  {
    "source":18,
    "target":0,
    "weight":2
  },
  {
    "source":18,
    "target":22,
    "weight":2
  },
  {
    "source":12,
    "target":6,
    "weight":2
  },
  {
    "source":25,
    "target":21,
    "weight":2
  },
  {
    "source":25,
    "target":11,
    "weight":2
  },
  {
    "source":21,
    "target":2,
    "weight":2
  },
  {
    "source":12,
    "target":21,
    "weight":2
  },
  {
    "source":14,
    "target":13,
    "weight":2
  },
  {
    "source":14,
    "target":10,
    "weight":2
  },
  {
    "source":15,
    "target":2,
    "weight":2
  },
  {
    "source":11,
    "target":10,
    "weight":2
  },
  {
    "source":11,
    "target":17,
    "weight":2
  },
  {
    "source":22,
    "target":23,
    "weight":2
  },
  {
    "source":22,
    "target":24,
    "weight":2
  },
  {
    "source":23,
    "target":2,
    "weight":2
  },
  {
    "source":17,
    "target":1,
    "weight":2
  },
  {
    "source":17,
    "target":2,
    "weight":2
  },
  {
    "source":26,
    "target":2,
    "weight":2
  },
  {
    "source":0,
    "target":10,
    "weight":2
  },
  {
    "source":16,
    "target":14,
    "weight":2
  },
  {
    "source":16,
    "target":1,
    "weight":2
  },
  {
    "source":6,
    "target":14,
    "weight":2
  },
  {
    "source":0,
    "target":13,
    "weight":2
  },
  {
    "source":3,
    "target":23,
    "weight":2
  },
  {
    "source":21,
    "target":14,
    "weight":2
  },
  {
    "source":8,
    "target":2,
    "weight":2
  },
  {
    "source":8,
    "target":11,
    "weight":2
  },
  {
    "source":8,
    "target":14,
    "weight":2
  },
  {
    "source":5,
    "target":11,
    "weight":2
  },
  {
    "source":5,
    "target":14,
    "weight":2
  },
  {
    "source":5,
    "target":4,
    "weight":2
  },
  {
    "source":0,
    "target":24,
    "weight":1
  },
  {
    "source":0,
    "target":26,
    "weight":1
  },
  {
    "source":6,
    "target":7,
    "weight":1
  },
  {
    "source":6,
    "target":17,
    "weight":1
  },
  {
    "source":7,
    "target":20,
    "weight":1
  },
  {
    "source":14,
    "target":26,
    "weight":1
  },
  {
    "source":26,
    "target":1,
    "weight":1
  },
  {
    "source":23,
    "target":24,
    "weight":1
  },
  {
    "source":11,
    "target":23,
    "weight":1
  },
  {
    "source":15,
    "target":26,
    "weight":1
  },
  {
    "source":13,
    "target":11,
    "weight":1
  },
  {
    "source":22,
    "target":1,
    "weight":1
  },
  {
    "source":10,
    "target":2,
    "weight":1
  },
  {
    "source":10,
    "target":23,
    "weight":1
  },
  {
    "source":22,
    "target":2,
    "weight":1
  },
  {
    "source":25,
    "target":6,
    "weight":1
  },
  {
    "source":25,
    "target":16,
    "weight":1
  },
  {
    "source":8,
    "target":1,
    "weight":1
  },
  {
    "source":25,
    "target":12,
    "weight":1
  },
  {
    "source":8,
    "target":20,
    "weight":1
  },
  {
    "source":25,
    "target":17,
    "weight":1
  },
  {
    "source":12,
    "target":15,
    "weight":1
  },
  {
    "source":8,
    "target":4,
    "weight":1
  },
  {
    "source":8,
    "target":3,
    "weight":1
  },
  {
    "source":12,
    "target":7,
    "weight":1
  },
  {
    "source":8,
    "target":6,
    "weight":1
  },
  {
    "source":8,
    "target":17,
    "weight":1
  },
  {
    "source":25,
    "target":2,
    "weight":1
  },
  {
    "source":18,
    "target":24,
    "weight":1
  },
  {
    "source":4,
    "target":24,
    "weight":1
  },
  {
    "source":4,
    "target":17,
    "weight":1
  },
  {
    "source":4,
    "target":23,
    "weight":1
  },
  {
    "source":4,
    "target":22,
    "weight":1
  },
  {
    "source":4,
    "target":25,
    "weight":1
  },
  {
    "source":18,
    "target":2,
    "weight":1
  },
  {
    "source":18,
    "target":23,
    "weight":1
  },
  {
    "source":16,
    "target":2,
    "weight":1
  },
  {
    "source":16,
    "target":23,
    "weight":1
  },
  {
    "source":5,
    "target":20,
    "weight":1
  },
  {
    "source":5,
    "target":23,
    "weight":1
  },
  {
    "source":3,
    "target":26,
    "weight":1
  },
  {
    "source":3,
    "target":10,
    "weight":1
  },
  {
    "source":5,
    "target":21,
    "weight":1
  },
  {
    "source":5,
    "target":16,
    "weight":1
  },
  {
    "source":3,
    "target":13,
    "weight":1
  },
  {
    "source":5,
    "target":7,
    "weight":1
  },
  {
    "source":21,
    "target":17,
    "weight":1
  },
  {
    "source":21,
    "target":23,
    "weight":1
  },
  {
    "source":21,
    "target":10,
    "weight":1
  },
  {
    "source":21,
    "target":22,
    "weight":1
  },
  {
    "source":21,
    "target":16,
    "weight":1
  },
  {
    "source":21,
    "target":1,
    "weight":1
  },
  {
    "source":9,
    "target":1,
    "weight":1
  },
  {
    "source":9,
    "target":20,
    "weight":1
  },
  {
    "source":9,
    "target":2,
    "weight":1
  },
  {
    "source":9,
    "target":10,
    "weight":1
  },
  {
    "source":9,
    "target":0,
    "weight":1
  }
]

  let width = $state(1000);
  let selectedChoice = $state('');

  let finalScene = $state(false)
  let backgroundAudio = $state(null);
  let narration = $state(null);

  let isLoading = $state(false);
  let error = $state("");

  let charsData = $state("");
  let scenesData = $state("");
  let textData = $state("");

  let storyNumber = $state(0);
  let sceneNumber = $state(1);
  let scenario = $state('.0');

  let sceneScript = $state("");
  let voiceText = $state([]);

  let generatedImage = $state(null);
  let clicked = $state(false);

  let textContentRef = $state(null);
  

  let sceneText = $derived.by(() => {
    if(textData){
      return textData.filter((item) => item.story === storyNumber && item.scene === sceneNumber && item.scenario === scenario);
    }
  });

  let idx = $derived.by(() => {
    if(textData){
      return textData.findIndex((item) => item.story === storyNumber && item.scene === sceneNumber && item.scenario === scenario);
    }
  });

  let choices = $derived.by(() => {
    if(scenesData && sceneNumber < 4 ){
      return scenesData[storyNumber].scenes[sceneNumber-1].choices;
    }
  });
  
  
  async function loadJsonData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  }

  onMount(async () => {
    scenesData = await loadJsonData("final-scenes.json");
    charsData = await loadJsonData("final-characters.json");
    textData = await loadJsonData("scene-text.json");

    textData.forEach(function(d,i){
      d.id = i
    });

    // Track window width for responsive layout
    const updateWidth = () => {
      width = window.innerWidth;
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    setupBackgroundMusic();



    return () => {
      window.removeEventListener("resize", updateWidth);
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio = null;
      }
    };
  });
  
  // Watch for changes in sceneText and animate text when it changes

// function animateText() {
  
//   const paragraphs = textContentRef.querySelectorAll('p');
  
//   // Set positioning on parent container
//   gsap.set(textContentRef, { position: "relative" });
  
//   const split = new SplitText(paragraphs, { type: "words, chars"});

//     gsap.set(split.chars, { textIndent: 0, opacity: 0,});

  
//   gsap.to(split.chars, {
//     duration: 1,       
//     opacity: 1,
//     stagger: 0.05
//   });
// }
  function selectChoice(index) {
    if (sceneNumber === 3) {
      finalScene = true;
    }
  
    selectedChoice = index;
    scenario = '.'+ (index+1);
    sceneNumber += 1;
    
    narrate(idx);
    
    // Scroll the right page back to the top
    if (textContentRef) {
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  }
  
  function scrollToTop() {
    if (textContentRef) {
      textContentRef.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  function narrate(idx){
    if(narration){
      narration.pause();
    }

    narration = new Audio('/clips/output-'+idx+'.mp3'); // The path is relative to your public/static directory
    narration.loop = false;
    narration.volume = .5; // Lower volume for background

    if(sceneNumber > 0){
      narration.play()
    }
  }

  function setupBackgroundMusic() {
    if (backgroundAudio) {
      backgroundAudio.pause();
    }
    
    // For Svelte projects with static assets in the "static" folder
    backgroundAudio = new Audio('/new-rain.mp3'); // The path is relative to your public/static directory
    backgroundAudio.loop = true;
    backgroundAudio.volume = 1; // Lower volume for background
    
    // Due to browser autoplay policy, we need user interaction
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('click', startNarration, { once: true });
  }

  function startAudio() {
    if (backgroundAudio) {
      backgroundAudio.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  }

  function startNarration() {
    if (narration) {
      console.log('Clicked:', clicked);
      narration.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
              // animateText();

    }
  }
</script>

<svelte:head>
  <!-- Import the Uncial Antiqua font from Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Uncial+Antiqua&display=swap" rel="stylesheet">
</svelte:head>

<main>
  {#if scenesData}
  <div class="book-container opened">
    {#if width > 600}
      <!-- Desktop layout: Left page for image, right page for text -->
      <div class="book">
        <div class="page left-page">
          <div class="page-content image-container">
            <div class="img">
              <img 
                src={"imgs/img-"+(sceneNumber-1) +".png"}
              />
            </div>
           

            <!-- <div class="diagram-container">
    <RadialChart 
      nodes={sampleNodes} 
      edges={sampleEdges} 
    />
  </div> -->
          </div>
        </div>
        <div class="book-spine"></div>
        <div class="page right-page" on:click={() => {narrate(idx);
}}>
          <h2>{scenesData[storyNumber].irish_name}</h2>
          <a>{'('+scenesData[storyNumber].name+')'}</a>
          <div class="page-content text-content" bind:this={textContentRef}>
            {#if sceneText}
              {#each sceneText[0]['text-content'].split('XXX') as paragraph, i}
                <p class={'p'+i}>{paragraph}</p>
              {/each}
            {/if}
            
            {#if !isLoading && !finalScene}
            <div class="choices-container">
              <h2>What will you do?</h2>
              <ul class="choices">
                {#each choices as choice, i}
                  <li
                    class={selectedChoice === i ? "" : ""}
                    on:click={() => selectChoice(i)}
                  >
                    {choice}
                  </li>
                {/each}
              </ul>
            </div>
            {/if}
            
            {#if error}
              <p class="error">{error}</p>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
        background-image: url("backg2.png");
    background-size: cover;
    background-repeat: no-repeat;
    font-family: "Eagle Lake", cursive;
  }

  a{
        color: #5c3117;

  }


  main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .book-container {
    max-width: 942px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .book {
    display: flex;
    width: 942px;
    height: 723px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    position: relative;
    justify-content: center;
    align-items: center;
    background-image: url("bookg2.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .book.mobile {
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }
  .page {
    box-sizing: border-box;
    position: relative;
    border: 0px solid #a89070;
  }


  .diagram-container {
    margin: 0 auto;
    margin-left: 60px

  }

  .left-page,
  .right-page {
    width: 50%;
  }

  .left-page {
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .right-page {
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-left: 20px;
    padding-right: 85px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: calc(100% - 40px);
  }

  .book-spine {
    width: 0px;
    background-color: #8b4513;
    z-index: 10;
  }

  .page-content {
    height: 533px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none; /* Internet Explorer and Edge */
    scrollbar-color: none;
    scrollbar-track-color: none;
    padding: 0px;
    margin-top: 20px;
  }

  .text-content {
    color: #3c2415;
    line-height: 1.6;
    font-size: 18px;
    text-align: justify;
  }

  .text-content h1 {
    font-size: 26px;
    text-align: center;
    margin-bottom: 20px;
    color: #5c3117;
    border-bottom: 2px solid #8b451380;
    padding-bottom: 10px;
  }

  .text-content p {
    margin-bottom: 16px;  
  }

.p0::first-letter {
   font-family: "Uncial Antiqua";
   font-size: 38px;
   line-height: normal;
} 

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-container.mobile {
    height: 50vh;
    max-height: 300px;
    margin-bottom: 20px;
  }

  .image-container img {
    max-width: calc(90% - 100px);
    max-height: 85%;
    padding-left: 100px;
    padding-right: 20px;
    border-radius: 20px;
  }

  .image-container.mobile img {
    max-height: 100%;
  }

  .choices-container {
    margin-top: 30px;
    padding: 15px;
    border-radius: 5px;
    border: 0px solid #8b451350;
  }

  .choices-container h2 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 22px;
    color: #5c3117;
    font-family: 'Uncial Antiqua';
  }

  h2{
        font-family: 'Uncial Antiqua';
            color: #5c3117;

  }


  .choices {
    list-style-type: none;
    padding: 0;
  }

  .choices li {
    padding: 10px 15px;
    margin-bottom: 10px;
    border: 1px solid #ab804c;
    border-radius: 10px;
    cursor: pointer;
    background-color: #ab804c66;
    transition: all 0.3s ease;
  }

  .choices li:hover {
    background-color: #ab804cbb;
    transform: translateX(5px);
  }

  .choices li.selected {
    background-color: rgba(139, 69, 19, 0.2);
    border-color: #8b4513;
    transform: translateX(10px);
  }

  .loading-indicator {
    text-align: center;
    margin: 20px 0;
  }

  .spinner {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 3px solid rgba(139, 69, 19, 0.2);
    border-radius: 50%;
    border-top-color: #8b4513;
    animation: spin 1s linear infinite;
    margin-top: 10px;
  }

  .error {
    color: #8b2500;
    background-color: rgba(139, 37, 0, 0.1);
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 600px) {
    .text-content {
      font-size: 16px;
    }

    .text-content h1 {
      font-size: 22px;
    }

    .choices-container h2 {
      font-size: 18px;
    }

    .book.mobile .page {
      background-image: url("right.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  
</style>