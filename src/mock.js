// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  var result = [];
  for (let i = 0; i < 5; i++) {
    var orderLine = [];
    var lineLength = Random.integer(1, 5);
    console.log(Random.integer(1, 5));
    for (let i = 0; i < lineLength; i++) {
      orderLine.push({
        image: Random.image('200x100'),
        price: Random.float(1, 1000),
        num: Random.integer(1, 10),
        desc: Random.ctitle(2, 5) + '重约' + Random.integer(1, 5000) + 'g',
        title: Random.ctitle(5, 8)
      });
    }
    var province = Random.province();
    var city = Random.city(province);
    var county = Random.county(city);
    var stateList = [
      { name: 'need_pay', title: '待付款' },
      { name: 'need_send', title: '待发货' },
      { name: 'need_pay', title: '完成' }];
    var newArticleObject = {
      title: Random.csentence(5, 10), //  Random.csentence( min, max )
      state: stateList[Random.integer(0, 2)], // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      name: '' + Random.natural(), // Random.cname() 随机生成一个常见的中文姓名
      message: '产品共计1 合计 ¥ 20(含运费¥ 1)', // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      otherMessage: '运费保险 等', // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      orderLine: orderLine,
      userAddress: county
    };
    result.push(newArticleObject);
  };
  return {
    result: result
  };
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/get/orders', 'post', produceNewsData);

const onProduct = function() {
  var orderLine = [];
  var lineLength = Random.integer(1, 5);
  console.log(Random.integer(1, 5));
  var statusList = ['已发货', '准备中', '已签收', '已完成', '派送中', '快递中'];
  var shopList = [];
  var allCost = 0;
  for (let j = 0; j < Random.integer(2, 4); j++) {
    orderLine = [];
    for (let i = 0; i < lineLength; i++) {
      var price = Random.integer(1, 1000);
      var num = Random.integer(1, 10);
      orderLine.push({
        image: Random.image('180x200'),
        price: price,
        num: num,
        desc: Random.ctitle(2, 5) + '重约' + Random.integer(1, 5000) + 'g',
        title: Random.ctitle(5, 8)
      });
      allCost = allCost + price * num * 100;
    }
    shopList.push({ productLine: orderLine,
      status: statusList[Random.integer(0, 5)],
      shopName: Random.ctitle(2, 5) });
  }
  var province = Random.province();
  var city = Random.city(province);
  var county = Random.county(city);
  var stateList = [
    { name: 'need_pay', title: '待付款' },
    { name: 'need_send', title: '待发货' },
    { name: 'need_pay', title: '完成' }];
  var newArticleObject = {
    title: Random.csentence(5, 10), //  Random.csentence( min, max )
    state: stateList[Random.integer(0, 2)], // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    name: '' + Random.natural(), // Random.cname() 随机生成一个常见的中文姓名
    message: '产品共计1 合计 ¥ 20(含运费¥ 1)', // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    otherMessage: '运费保险 等', // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    shopList: shopList,
    allPrice: allCost,
    originPrice: allCost,
    userAddress: county,
    currentContact: { name: Random.ctitle(2, 4), tel: '' + Random.integer(11), address: county }
  };
  return {
    result: newArticleObject
  };
};
Mock.mock('/get/orderDetail', 'post', onProduct);

const homePage = function() {
  var allData = { hotCat: '', images: '', competitiveProducts: '' };
  var hotRowLine = [];
  var hotCatLine = [];
  for (let i = 0; i < 2; i++) {
    hotCatLine = [];
    for (let j = 0; j < 4; j++) {
      hotCatLine.push({
        image: Random.image('200x200'),
        productId: Random.integer(1000, 8000),
        name: Random.ctitle(2, 4),
        price: Random.integer(2, 100) + '积分'
      });
    }
    hotRowLine.push(hotCatLine);
  }
  var images = [];
  for (let i = 0; i < 4; i++) {
    images.push({
      image: Random.image('500x500'),
      articleId: Random.integer(1000, 8000)
    });
  }
  var competitiveProducts = { name: '精品推荐', product: [] };
  for (let i = 0; i < 9; i++) {
    competitiveProducts.product.push({
      image: Random.image('80x80'),
      articleId: Random.integer(1000, 8000),
      name: Random.integer(1000, 8000)
    });
  }

  allData.hotCat = hotRowLine;
  allData.images = images;
  allData.competitiveProducts = competitiveProducts;
  return {
    result: allData
  };
};
Mock.mock('/get/homePageVal', 'post', homePage);

const homeProdcutList = function() {
  var products = [];
  for (let j = 0; j < 10; j++) {
    products.push({
      image: Random.image('120x150'),
      productId: Random.integer(1000, 8000),
      name: Random.ctitle(2, 4),
      desc: Random.ctitle(6, 10),
      num: Random.integer(2, 100),
      price: Random.integer(2, 100) + '积分'
    });
  }
  return {
    result: products
  };
};
Mock.mock('/get/goodsList', 'post', homeProdcutList);

var getGoodsSku = function() {
  var skuJson = [{
    'dim': 1, 'saleAttrList': [
      { 'skuIds': [4527256, 4933449, 4512471, 4512467, 4460331, 4047307],
        'imagePath': 'jfs/t5698/100/4596147819/145612/2cce3ed1/59521259Ne7404ff7.jpg', 'saleValue': '\u6a31\u82b1\u7c89' },
      { 'skuIds': [4460325, 5114935, 4325123], 'imagePath': 'jfs/t6598/73/190892520/246785/46883a6e/593ba628N8794c6a6.jpg', 'saleValue': '\u6d45\u84dd\u8272' },
      { 'skuIds': [4390096, 4512445, 4460333, 4512465, 4780389, 4791052], 'imagePath': 'jfs/t3076/42/8593902551/206108/fdb1a60f/58c60fc3Nf9faa2fa.jpg', 'saleValue': '\u78e8\u7802\u9ed1' },
      { 'skuIds': [3915537], 'imagePath': 'jfs/t5050/1/1165634167/293759/f54c5ed2/58ed8800N261978fb.jpg', 'saleValue': '\u84dd\u7eff\u8272' },
      { 'skuIds': [4512487, 4390094], 'imagePath': 'jfs/t4621/258/2224761053/195204/fa95be0d/58ed8c2fN2a4c2cc6.jpg', 'saleValue': '\u94c2\u94f6\u7070' },
      { 'skuIds': [3846673, 4512491, 4032215, 4512459, 4780359, 4460347], 'imagePath': 'jfs/t6553/346/1473938601/145939/f7796bfa/59521206N527bb108.jpg', 'saleValue': '\u9999\u69df\u91d1' }], 'saleName': '\u989c\u8272' }, { 'dim': 2, 'saleAttrList': [{ 'skuIds': [4527256, 3846673, 4390096, 4512445, 4512467, 5114935, 4512459, 4512487, 4390094, 3915537], 'imagePath': null, 'saleValue': '3GB 32GB' },
      { 'skuIds': [4460325, 4460333, 4512471, 4512465, 4460331, 4047307, 4512491, 4032215, 4460347, 4791052, 4325123], 'imagePath': null, 'saleValue': '4GB 64GB' },
      { 'skuIds': [4933449, 4780359, 4780389], 'imagePath': null, 'saleValue': '4GB 64GB\uff08\u79fb\u52a8\u5b9a\u5236\u5168\u7f51\u901a\uff09' }], 'saleName': '\u7248\u672c' }, { 'dim': 3, 'saleAttrList': [
        { 'skuIds': [4512445, 4512471, 4512465, 4512467, 4512491, 4512459, 4512487], 'imagePath': null, 'saleValue': '\u4fdd\u9669\u5957\u88c5' },
        { 'skuIds': [4460325, 4460333, 4460331, 4460347], 'imagePath': null, 'saleValue': '\u5b9a\u4f4d\u5957\u88c5' },
      { 'skuIds': [4527256, 3846673, 4933449, 4390096, 5114935, 4047307, 4032215, 4390094, 3915537, 4780359, 4780389, 4791052, 4325123], 'imagePath': null, 'saleValue': '\u88f8\u673a' }], 'saleName': '\u8d2d\u4e70\u540d\u79f0' }];

  var skuTree = [];
  var skuList = [];
  var skus = [];
  for (let i = 0; i < skuJson.length; i++) {
    skuTree.push({
      'k_s': skuJson[i].dim + '',
      k: skuJson[i].saleName,
      v: []
    });
    for (let j = 0; j < skuJson[i].saleAttrList.length; j++) {
      var attrId = Random.integer(100000, 1000000);
      skuTree[skuTree.length - 1].v.push({
        id: attrId + '',
        name: skuJson[i].saleAttrList[j].saleValue,
        imgUrl: 'http://img13.360buyimg.com/n0/' + skuJson[i].saleAttrList[j].imagePath
      });
      for (let k = 0; k < skuJson[i].saleAttrList[j].skuIds.length; k++) {
        if (skus.indexOf(skuJson[i].saleAttrList[j].skuIds[k]) < 0) {
          const attr = skuJson[i].dim + '';
          skus.push(skuJson[i].saleAttrList[j].skuIds[k]);
          skuList.push({
            price: Random.integer(10, 1000),
            id: skuJson[i].saleAttrList[j].skuIds[k]
          });
          skuList[skuList.length - 1][attr] = attrId;
        } else {
          skuList[skus.indexOf(skuJson[i].saleAttrList[j].skuIds[k])][skuJson[i].dim] = attrId;
        }
      }
    }
  }
  console.log(skuTree);
  console.log(skuList);
  console.log(skus);
  return {
    result: { tree: skuTree, list: skuList }
  };
};
Mock.mock('/get/getGoodsSku', 'post', getGoodsSku);
var thumbs = [
  'jfs/t6520/331/1089001978/81731/75164eb7/594a37a7Nbf238ce7.jpg',
  'jfs/t6058/155/969572637/20614/6fd919e4/592e8d89Ncd9821ed.jpg',
  'g15/M07/12/0C/rBEhWVJvaNUIAAAAAAFO23_VM5cAAEufgLgwAcAAU7z943.jpg',
  '	jfs/t5167/246/90241913/148408/27e07fda/58f87327Nb3418960.jpg',
  'jfs/t4222/236/3792324942/405127/5e6895a9/58e83dd5Ne06d95d0.jpg',
  'jfs/t5230/288/100503114/197424/14915453/58f87322N8a1272d6.jpg',
  'jfs/t6079/16/2411000961/295727/16cc1c6e/5940ff2cN4a349a84.jpg',
  'jfs/t6079/16/2411000961/295727/16cc1c6e/5940ff2cN4a349a84.jpg',
  'g13/M01/05/04/rBEhU1KEekYIAAAAAAHfQlkjaqAAAFd9gGYcpYAAd9a410.jpg',
  'jfs/t10852/69/1019216077/418065/f937865f/59db1f8cN93efed0c.jpg',
  'jfs/t4639/245/582026275/111556/6aa8606a/58d1fd7fN46d644b0.jpg',
  'jfs/t7465/247/4202349615/70427/581818a/5a01a321N41e81840.jpg',
  'jfs/t2650/105/1117442102/208760/827e92c4/57335747N0ce77b7c.jpg',
  'jfs/t3586/127/1594906486/138769/bb837a48/582be2fdN907f437f.jpg',
  'jfs/t7531/21/3621555298/399169/a4b6d34f/59c21c01Nce4d33c0.jpg',
  'jfs/t5782/94/951807027/107102/b5d91a5a/59228eecN541c61c1.jpg',
  'jfs/t6067/50/5425799928/316261/413a82f1/596c339dN8d107fba.jpg',
  'jfs/t4366/71/2045605853/291379/56c87b03/58ca4dc5N1c303706.jpg',
  'jfs/t3997/155/920002377/372314/813c1345/586210f1Naf213509.jpg',
  'jfs/t6025/297/1199794256/308597/1319a39/59312087N9e907313.jpg',
  'jfs/t3316/327/925534159/264012/36d737e4/58185d27Nf11468eb.jpg',
  'jfs/t9010/353/1021381481/286573/b6a887b6/59baaca6N33c86fb3.jpg',
  'jfs/t5698/100/4596147819/145612/2cce3ed1/59521259Ne7404ff7.jpg',
  'jfs/t9916/316/2305170278/62366/3a1447f6/59f2f7d2N38f816bb.jpg',
  'jfs/t5656/183/8357361424/250180/594d9590/5978234bNdccfc0ec.jpg',
  'jfs/t10300/119/1747598257/168815/372e79cf/59e6b1caNdba1e2b6.jpg',
  'jfs/t8287/350/2427159969/142433/430fb21c/59ccd17eNebed7612.jpg',
  'jfs/t5653/334/7142475715/216433/adfd20f7/596f05b8Ne3347e62.jpg',
  'jfs/t8284/363/1326459580/71585/6d3e8013/59b857f2N6ca75622.jpg',
  'jfs/t5845/283/3029282901/139575/97407784/593692c3Neba552ea.jpg',
  'jfs/t5014/17/152292429/254365/126d8e97/58db914aNb485f8fa.jpg',
  'jfs/t4909/265/281173291/187118/46eff65/58ddfd62Naeaabb3b.jpg',
  'jfs/t3667/111/2238224664/230338/88b1271d/584654fcNa07f2c3e.jpg',
  'jfs/t12052/327/27615067/123900/a328b3ef/5a01c315Nb0176e3c.jpg',
  'jfs/t6313/9/361775681/80331/7a647145/593e4ec1Nf8874945.jpg',
  'jfs/t3373/247/1000083455/157057/387db100/581a9bcbN85e5f0a2.jpg',
  'jfs/t6295/248/1683884215/269723/b3c43437/5955c6e7N1e18d758.jpg',
  'jfs/t13372/101/13325431/70427/581818a/5a01a638N9c082481.jpg',
  'jfs/t1846/284/1504859992/95973/28b89716/565ff1b9N85cef595.jpg',
  'jfs/t10888/335/1248622203/92633/a0f69a17/59de1802Nacae2eb2.jpg',
  'jfs/t7303/35/4452071055/360758/36794399/5a014e30N3b7c1016.jpg',
  'jfs/t3301/16/1615084619/137077/bc52150e/57d0c513Nd51ff9a3.jpg',
  'jfs/t3106/271/3159789861/182436/8857a9a1/57ecc9d4N5183cfc5.jpg',
  'jfs/t10546/119/1007692688/358419/49ab51a9/59db1ed4Nac9024b8.jpg',
  'jfs/t7072/70/770659273/224621/51def495/59840c11N8380accc.jpg',
  'jfs/t2500/140/2373001479/542205/159c60a2/56cd08ecN866527bb.jpg',
  'jfs/t3475/235/594632011/135582/af801e4f/580f12bdN5659471e.jpg',
  'jfs/t8740/345/1324626863/267121/b87aaf29/59b79539N5ee8a31f.jpg',
  'jfs/t12826/258/453941393/77903/94670e7a/5a0bbc0aN601a57e8.jpg',
  'jfs/t10315/227/1754541026/256693/980afae7/59e5bdf4Nb6b9904a.jpg',
  'jfs/t4756/276/2202072274/229228/2dabe2e4/58f9e5fdNb6d3484f.jpg',
  'jfs/t8215/26/1298631064/94425/febfd44/59b9e23cN3f58cd96.jpg',
  'jfs/t5641/365/6763058847/371625/423b9ba5/596c2effN126fb68d.jpg',
  'jfs/t9349/45/1532833793/200090/267e3e56/59bb72d9N11feae8b.jpg',
  'jfs/t7750/259/1312711713/236360/5938a219/599c1062Nd651d2c1.jpg',
  'jfs/t3094/281/4693364807/209161/b3af192b/584fcf74Nfe1748ed.jpg',
  'jfs/t8284/363/1326459580/71585/6d3e8013/59b857f2N6ca75622.jpg',
  'jfs/t5335/39/1553366100/209772/32105f74/5911bac3N5d51d2aa.jpg',
  'jfs/t7519/271/716725745/182136/ba4736cf/59968f76N305fcda0.jpg',
  'jfs/t5860/31/1435315325/195398/ba8744bf/59264e07N797a8757.jpg',
  'jfs/t5881/279/1484279631/216483/4bbce005/592694e3Nda6f85d6.jpg',
  'jfs/t3376/108/2363165851/327545/686107c9/584f577aN18ce3b83.jpg',
  'jfs/t6055/105/9785665789/242409/f32688e2/599644b9N40f563da.jpg',
  'jfs/t4717/131/225494258/86027/36a57ccf/58dcd0baNd799945e.jpg',
  'jfs/t8866/302/1981122529/278885/96ccd6f8/59c23186N32b4fc90.jpg',
  'jfs/t5893/358/6006981394/188969/ff80aba/5966e95dNe5248b3d.jpg',
  'jfs/t10285/132/1611057220/333194/a05da231/59e45767Na9fa8cd0.jpg',
  'jfs/t10438/112/1205662754/210785/bf836347/59ddcd56N848dc34b.jpg',
  'jfs/t7201/59/2444944006/242409/f32688e2/599646fbN0329f015.jpg',
  'jfs/t6400/251/1498502133/126650/2ade0e70/5951fa4aN6c972662.jpg',
  'jfs/t967/1/1478624280/237831/cd2dd740/573001adN435be1da.jpg',
  'jfs/t2905/300/3847999660/312900/a9fb3e68/579b201cNed7566f1.jpg',
  'jfs/t11248/33/1480957878/70427/581818a/5a01a5b9N32675e8a.jpg',
  'jfs/t6055/105/9785665789/242409/f32688e2/599644b9N40f563da.jpg',
  'jfs/t5857/57/3540884961/258886/ed4e13c/593e4a8eNc91d6b28.jpg',
  'jfs/t4009/231/2184886632/159441/419975d9/58a43cdaN710d8e7e.jpg',
  'jfs/t3238/281/6935622958/250180/594d9590/58afdbdbNf0d5dfa7.jpg',
  'jfs/t3724/297/70731013/253611/a62cf5f0/57fe0b76N977c8829.jpg',
  'jfs/t5941/277/303563741/206302/bee5dd6a/59269427N60666d2c.jpg',
  'jfs/t2269/171/2134075275/79011/8c63b3b8/56b1b888N419ccf6c.jpg',
  'jfs/t8239/88/1957124504/330499/de78e394/59c1f21fN37a48a9a.jpg',
  'jfs/t7645/310/1491077037/143323/424b6c10/599d21b3N75095691.jpg',
  'jfs/t9883/249/1396078625/156545/91c4388a/59e08ddaN5a0fd12c.jpg',
  'jfs/t3250/72/1629247361/133742/e0c6726d/57d11c72N093250ec.jpg',
  'jfs/t6019/205/157969858/195398/ba8744bf/59264e5dN9862a0ac.jpg',
  'jfs/t4249/136/395545190/195516/2d25b5dc/58b3e356N4a8f9575.jpg',
  'jfs/t5839/335/9832328676/329980/98ecec34/59897c85Ncf1e2cd5.jpg',
  'jfs/t7438/195/493717560/185814/559e2ca8/5993e164Nda995521.jpg',
  'jfs/t5113/211/143860912/100416/cb06f1da/58f96b45Nda2a07b6.jpg',
  'jfs/t6043/305/5636125253/87985/21230f90/596f169aN1246fe10.jpg'
];
var getGoodsCartMessage = function() {
  var returnVal = {
    title: Random.ctitle(2, 4),
    num: Random.integer(1, 10),
    thumb: 'http://img13.360buyimg.com/n0/' + thumbs[Random.integer(0, thumbs.length)],
    price: Random.integer(100, 100000),
    desc: Random.ctitle(6, 8)
  };
  return {
    result: returnVal
  };
};
Mock.mock('/get/getGoodsCartMessage', 'post', getGoodsCartMessage);

var getGoodsClassList = function() {
  var result = [
    { index: 1, id: 6196, text: '厨具', children: [] },
    { index: 2, id: 9847, text: '家具', children: [] },
    { index: 3, id: 9987, text: '手机', children: [] },
    { index: 4, id: 1319, text: '母婴', children: [] },
    { index: 5, id: 12218, text: '生鲜', children: [] },
    { index: 6, id: 12259, text: '酒类', children: [] },
    { index: 7, id: 5025, text: '钟表', children: [] },
    { index: 8, id: 9192, text: '医药保健', children: [] },
    { index: 9, id: 6994, text: '宠物生活', children: [] },
    { index: 10, id: 652, text: '数码', children: [] }
  ];
  for (var i = 0; i < result.length; i++) {
    var secondClass = [];
    for (var j = 0; j < Random.integer(10, 20); j++) {
      var thirdClass = [];
      for (var k = 0; k <= Random.integer(10, 20); k++) {
        thirdClass.push({ index: k, id: Random.integer(100000, 3000000), text: Random.ctitle(2, 4) });
      }
      secondClass.push({ index: j, id: Random.integer(100000, 3000000), text: Random.ctitle(2, 4), children: thirdClass });
    }
    result[i].children = secondClass;
  }
  return {
    result: result
  };
};
console.log(getGoodsClassList);
Mock.mock('/get/classList', 'post', getGoodsClassList);

var getAddressList = function() {
  var returnVal = [{
    name: '张三',
    tel: '13000000000',
    address: '13000000000',
    province: '上海市',
    city: '上海市',
    areaCode: 310110,
    county: '杨浦区',
    isDefault: false,
    addressDetail: '国伟路135号',
    id: 123344
  }, {
    name: '里斯',
    tel: '13000000000',
    address: '13000000000',
    province: '上海市',
    city: '上海市',
    county: '杨浦区',
    areaCode: 310110,
    isDefault: false,
    addressDetail: '国伟路135号',
    id: 123345
  }];
  return {
    result: returnVal
  };
};
Mock.mock('/get/address_list', 'post', getAddressList);

