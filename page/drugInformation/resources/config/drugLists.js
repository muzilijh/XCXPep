const api = require('api.js');
const config = {
  // 慢性胃炎
  mxwy: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '[999]养胃舒胶囊', dcode: '6928849922069', norms: '24粒', dprice: '35.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15343246569734D57.png' },
        { id: 2, dname: '胃乃安胶囊', dcode: '6901591150720', norms: '0.3g*36粒/瓶。', dprice: '23.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1533628061341NMY9.png' },
        { id: 3, dname: '[思密达]蒙脱石散草莓味', dcode: '6932833600109', norms: '3g*10袋 草莓口味', dprice: '18.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1525344017631DQJF.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '[三精]多潘立酮片', dcode: '6933132800986', norms: '10mgx30片', dprice: '6.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/15329418594093JX6.png' },
        { id: 2, dname: '[999]补脾益肠丸(瓶装)', dcode: '6901339906114', norms: '90g', dprice: '25', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532505653723YO5B.png' },
        { id: 3, dname: '[999]三九胃泰颗粒', dcode: '6901339901218', norms: '20gx10袋', dprice: '11.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1524395378792VI4X.png' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '[达喜]铝碳酸镁片 ', dcode: '6924147603020', norms: '0.5g*20片/盒', dprice: '22.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531905548628QBNW.png' },
        { id: 2, dname: '香砂养胃丸（浓缩丸）', dcode: '6928982601425', norms: '200丸（浓缩丸）', dprice: '25.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532510272456K79G.png' },
        { id: 3, dname: '999养胃舒胶囊', dcode: '6928849922069', norms: ' 24粒', dprice: '36.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15343246569734D57.png' }
      ]
    },
  ],

  //胃溃疡
  wky: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '枸橼酸铋钾胶囊', dcode: '6927764908318', norms: '12粒/板*2板/盒', dprice: '19.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15264654722128MJ7.png' },
        { id: 2, dname: '法莫替丁片', dcode: '6902401043386', norms: '20mgx12片x2板', dprice: '32.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532413930996FSWM.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '正和元和正胃片', dcode: '6926893501889', norms: '6片', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15325995675939SBI.png' },
        { id: 2, dname: '胃康灵胶囊', dcode: '6930397801253', norms: '0.4gx12粒x4板', dprice: '16.90', imgUrl: api.imgLink + '/commonfiles/commodity/image/15318982737923MTJ.png' },
        { id: 3, dname: '健胃片', dcode: '6903281004559', norms: '0.32gx12片x4板', dprice: '25.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526635124897INVM.png' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '复方铝酸铋片', dcode: '6947368900013', norms: '50片(素片)', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532941416898TUX9.png' },
        { id: 2, dname: '胃苏颗粒（无糖)', dcode: '6934173416327', norms: '5gx9袋', dprice: '29.70', imgUrl: api.imgLink + '/commonfiles/commodity/image/1530243688585AJV6.png' },
        { id: 3, dname: '丹南泰和胃整肠丸', dcode: '8851445907117', norms: '0.2gx50丸', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526994310710FLJ4.png' }
      ]
    },
  ],

  // 腹泻
  fx: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '苋菜黄连素胶囊', dcode: '6905942303582', norms: '0.4g*24粒', dprice: '31.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1536821827039V69K.png' },
        { id: 2, dname: '必奇蒙脱石散', dcode: '6920209687779', norms: '0.24gx24片', dprice: '24.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526908734563DYXA.png' },
        { id: 3, dname: '喇叭牌康腹止泻片', dcode: '4987110007272', norms: '0.24gx24片', dprice: '34.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526899486302MSN7.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '康恩贝肠炎宁片', dcode: '6946572600078', norms: '0.42gx12片x2板', dprice: '33.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/15270603283065KQX.png' },
        { id: 2, dname: '仁和蒙脱石散', dcode: '6940609501239', norms: '3g*9袋', dprice: '25.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526477699524U76H.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '乳酸菌素片', dcode: '6933132801464', norms: '0.4gx36片', dprice: '22.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/15329408645102TD6.png' },
        // { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
  ],

  // 儿童感冒
  etgm: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '[999]小儿感冒颗粒', dcode: '6928476702058', norms: '6gx20袋', dprice: '16.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532402546613E8L4.png' },
        { id: 2, dname: '[云南白药]小儿解表颗粒 ', dcode: '6901070384752', norms: '4g*10袋/盒', dprice: '32.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1525319466662VNP6.png' },
        { id: 3, dname: '仁和小儿感冒颗粒', dcode: '6934883300589', norms: '12gx8袋', dprice: '22.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532073749331BWLD.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '仁和小儿氨酚烷胺颗粒', dcode: '6930463401059', norms: '6gx16袋 ', dprice: '12.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/15332853448182YC9.png' },
        { id: 2, dname: '小儿复方氨酚烷胺片', dcode: '6934366600687', norms: '12片', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15320807784806SJE.png' },
        { id: 3, dname: '[美林]布洛芬混悬液 ', dcode: '6920312611029', norms: '100ml/瓶', dprice: '20.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1524231114647AGMJ.png' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '惠氏小儿善存片', dcode: '6921361281072', norms: '30片', dprice: '39.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1533890203079J5P9.png' },
        { id: 2, dname: '云南白药小儿感冒颗粒', dcode: '6901070385094', norms: '12gx6袋', dprice: '26.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532341395816CGBZ.png' },
        { id: 3, dname: '葵花小儿氨酚黄那敏颗粒', dcode: '6943116400309', norms: '3gx10袋', dprice: '19.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1530174347219YGZ2.png' }
      ]
    },
  ],

  // 儿童发烧
  etfs: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '复方小儿退热栓', dcode: '6935796802962', norms: '7粒/盒', dprice: '18.00', imgUrl: api.imgLink + '/yaobili-business-goods/png/1548381240105XR8B.png' },
        { id: 2, dname: '对乙酰氨基酚栓', dcode: '6942109809105', norms: '10粒', dprice: '5.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532332145758YR37.png' },
        { id: 3, dname: '葵花小儿氨酚烷胺颗粒', dcode: '6934366600281', norms: '12袋', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532315881075B9UY.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '葵花小儿柴桂退热颗粒', dcode: '6934748008469', norms: ' 5g*10袋/盒', dprice: '33.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1533631921925V5PR.png' },
        { id: 2, dname: '美林布洛芬混悬液', dcode: '6920312611029', norms: '100ml/瓶', dprice: '20.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1524231114647AGMJ.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '冰宝贴', dcode: '6923251811079', norms: '50mmx110mmx2片x3袋', dprice: '55.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526990626418IDMP.png' },
        { id: 2, dname: '惠氏小儿善存片', dcode: '6921361281072', norms: '30片', dprice: '39.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1533890203079J5P9.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
  ],

  //儿童咳嗽
  etks: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '小儿清咽颗粒', dcode: '6901070385605', norms: '6gx9袋', dprice: '19.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532340551584EUVD.png' },
        { id: 2, dname: '仁和小儿咽扁颗粒', dcode: '6930397802014', norms: '8gx10袋', dprice: '28.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532076784096YVSN.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '葵花小儿咽扁颗粒', dcode: '6922308787053', norms: '9袋', dprice: '24.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/15320796275432ZL3.png' },
        { id: 2, dname: '小儿肺热咳喘颗粒', dcode: '6922867752424', norms: '6袋', dprice: '29.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532314567800U2IR.png' },
        { id: 3, dname: '仁和小儿咳喘灵', dcode: '6924584108812', norms: '2g*9袋', dprice: '20.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526477295573PULF.png' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '仁和小儿止咳糖浆', dcode: '6942623600493', norms: '120ml/瓶', dprice: '22.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532337635929CFT9.png' },
        // { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
  ],

  // 湿疹
  sz: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '[999]糠酸莫米松凝胶', dcode: '6926720801038', norms: '10g', dprice: '30.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1527041761349X3FO.png' },
        { id: 2, dname: '百多邦莫匹罗星软膏', dcode: '6913991300445', norms: '5g:0.1g', dprice: '19.90', imgUrl: api.imgLink + '/commonfiles/commodity/image/153023880333338JU.png' },
        { id: 3, dname: '湿毒清片', dcode: '6933890700115', norms: '30片', dprice: '16.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1524395793961D74H.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '丹皮酚软膏', dcode: '6921665100437', norms: '20克/支', dprice: '18.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531452425017EG2P.png' },
        { id: 2, dname: '克林霉素磷酸酯凝胶', dcode: '6921162880306', norms: '15g(1%)', dprice: '15.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531994038771DF3Z.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '糠酸莫米松乳膏', dcode: '6923703288022', norms: '10g：10mg', dprice: '28.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15270420557887BDS.png' },
        { id: 2, dname: '百多邦创面消毒喷雾剂', dcode: '6913991301213', norms: '70ml', dprice: '19.80', imgUrl: api.imgLink + '/yaobili-business-goods/png/1558514942298BQIK.png' },
        { id: 3, dname: '白云山红霉素软膏', dcode: '6942109807040', norms: '10g(1%)', dprice: '4.20', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532401152349ZN6I.png' }
      ]
    },
  ],

  //皮炎
  py: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '999复方醋酸地塞米松乳膏', dcode: '6901339905414', norms: '30g*1支/盒', dprice: '12.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1524194627028SAH6.png' },
        { id: 2, dname: '克林霉素磷酸酯凝胶', dcode: '6921162880306', norms: '15g(1%)', dprice: '15.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531994038771DF3Z.png' },
        { id: 3, dname: '曲咪新乳膏', dcode: '6942109808030', norms: '10g', dprice: '4.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532398843572UOI4.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '白云山红霉素软膏', dcode: '6942109807040', norms: '10g(1%)', dprice: '4.20', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532401152349ZN6I.png' },
        { id: 2, dname: '999糠酸莫米松凝胶', dcode: '6926720801038', norms: '10g', dprice: '30.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1527041761349X3FO.png' },
        // { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
      ]
    },
    // {
    //   title: '推荐用药|甄选', lists: [
    //     { id: 1, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
    //     { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
    //     { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
    //   ]
    // },
  ],

  // 风热感冒
  frgm: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '仁和可立克风热感冒颗粒', dcode: '6935803462356', norms: '10gx9袋', dprice: '28.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531733213072XDCB.png' },
        { id: 2, dname: '[白云山]清开灵胶囊 ', dcode: '6914159003840', norms: '24粒', dprice: '15.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532399834504DJ4O.png' },
        { id: 3, dname: '桑菊感冒颗粒', dcode: '6902329052576', norms: '11gx10袋', dprice: '25.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/153267561800329XM.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '[白云山]板蓝根颗粒(无蔗糖) ', dcode: '6938200754628', norms: '20袋', dprice: '29.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1532415113001CEIY.png' },
        { id: 2, dname: '羚羊感冒片', dcode: '6938706202128', norms: '10片x3板', dprice: '15.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531896959348VU6Z.png' },
        { id: 3, dname: '同仁堂感冒清热颗粒', dcode: '6938706201596', norms: '12gx6袋', dprice: '27.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531906613041R972.PNG' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '维生素C泡腾片', dcode: '6904082680560', norms: '1.0gx12片', dprice: '35.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526873755090X4N2.png' },
        { id: 2, dname: '柴黄颗粒', dcode: '6940773300928', norms: '4gx6袋', dprice: '37.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531811424748EXUP.png' },
        { id: 3, dname: '感冒灵胶囊', dcode: '6901339924569', norms: '0.5gx12粒', dprice: '22.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15318251936682WRY.PNG' }
      ]
    },
  ],

  //风寒感冒
  fhgm: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '仁和可立克风寒感冒', dcode: '6935803462349', norms: '8gx9袋', dprice: '26.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531733813782BZPU.png' },
        { id: 2, dname: '999姜枣祛寒颗粒', dcode: '6928476700092', norms: '15gx10袋', dprice: '26.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531824802326Q37Z.PNG' },
        { id: 3, dname: '四季感冒胶囊', dcode: '6933562689359', norms: '10粒x3板', dprice: '21.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15317140188406FO9.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '同仁堂感冒清热颗粒', dcode: '6938706201596', norms: '12gx6袋', dprice: '27.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531906613041R972.PNG' },
        { id: 2, dname: '氨金黄敏颗粒', dcode: '6932830904040', norms: '12袋 ', dprice: '25.80', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526908476996J8RG.png' },
        { id: 3, dname: '云南白药四季感冒片', dcode: '6901070385636', norms: '0.36gx12片x2板（薄膜衣片）', dprice: '22.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531727498947RW2I.PNG' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '天然维生素C', dcode: '6951804904527', norms: '20片', dprice: '40.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15281013185636TFI.png' },
        {
          id: 2, dname: '仁和可立克复方氨酚胶囊', dcode: '6930463400816', norms: '16粒/盒', dprice: '23.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1531735448118I7QN.png' },
        { id: 3, dname: '白云山氨咖黄敏胶囊', dcode: '6900372205017', norms: '12粒/盒', dprice: '5.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/1525319316681W6PJ.png' }
      ]
    },
  ],

  other: [
    {
      title: '推荐用药|热销', lists: [
        { id: 1, dname: '[三精]乳酸菌素片', dcode: '6933132801464', norms: '0.4gx36片', dprice: '18.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15329408645102TD6.png' }
      ]
    },
    {
      title: '推荐用药|品牌', lists: [
        { id: 1, dname: '[敖东]维生素C泡腾片', dcode: '6904082680560', norms: '1.0gx12片', dprice: '35.50', imgUrl: api.imgLink + '/commonfiles/commodity/image/1526873755090X4N2.png' }
      ]
    },
    {
      title: '推荐用药|甄选', lists: [
        { id: 1, dname: '[美健天臣]甜橙维生素C泡腾片', dcode: '6951804904527', norms: '20片', dprice: '40.00', imgUrl: api.imgLink + '/commonfiles/commodity/image/15281013185636TFI.png' }
      ]
    }
  ],






// ---------------
  // ce: [
  //   {
  //     title: '推荐用药|热销', lists: [
  //       { id: 1, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
  //     ]
  //   },
  //   {
  //     title: '推荐用药|品牌', lists: [
  //       { id: 1, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
  //     ]
  //   },
  //   {
  //     title: '推荐用药|甄选', lists: [
  //       { id: 1, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 2, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' },
  //       { id: 3, dname: '', dcode: '', norms: '', dprice: '.00', imgUrl: api.imgLink + '/' }
  //     ]
  //   },
  // ],
  //---------------

  

  
}
module.exports = config;