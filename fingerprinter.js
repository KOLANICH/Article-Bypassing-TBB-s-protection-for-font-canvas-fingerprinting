(function () {
	"use strict";
	let alphabet = [
		[0x20, 0x7F], //latin
		[0xA0, 0xFF], //exlat
		[0x400, 0x52F], //cyr
		[0x370, 0x3FF], //greek
		[0x2200, 0x22FF], //math
		[0x20A0, 0x20CF], //currency
	];
	const windSize = 200;
	const countOfIts = 10;
	const charVecSize = 3;
	const defFonts = [
		"Times New Roman", "Arial", "Impact", "Courier New", "Bookman Old Style", //Monotype Corporation
		"Consolas", "MS Gothic", "Constantia", "Segoe UI", "Verdana", "Meiryo", "Meiryo UI", //Microsoft
		"Calibri", "Cambria","Cambria Math", "Tahoma", //office
		"Arimo", "Cousine", "Noto Emoji", "Noto Sans", "Noto Serif", "STIX Math", "Tinos", //TBB-bundled fonts
		"Wingdings", "Webdings", "Symbol", //symbol
		"Ubuntu Mono", "Droid Sans", "DejaVu Sans", //linux
		"Inconsolata", "Inconsolata LGC", "Source Code Pro", "Hack", //coders'
		"Lucida Console", "Lucida Handwriting", //Bigelow & Holmes
		"Georgia", //Carter & Cone
		"San Francisco", //Apple
		"System", "vgaoem"
	];
	let alphabetLength = alphabet.map(function (a) {
			return a[1] - a[0] + 1;
		}).reduce(function (a, b) {
			return a + b;
		});
	let tot = alphabetLength * defFonts.length;


	//typical lengths of symbols
	const reference = new Uint16Array([900, 0, 0, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 324, 360, 2443, 599, 666, 2443, 599, 666, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1000, 2443, 599, 666, 2443, 1080, 1000, 2443, 500, 555, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 500, 555, 2443, 500, 555, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1200, 1333, 2443, 1080, 1200, 2443, 1299, 1444, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1299, 1444, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1099, 1221, 2443, 1299, 1444, 2443, 1080, 1333, 2443, 1698, 1887, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1099, 1221, 2443, 900, 1000, 2443, 500, 555, 2443, 900, 1000, 2443, 844, 938, 2443, 900, 1000, 2443, 599, 666, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 500, 555, 2443, 1080, 1000, 2443, 900, 1000, 2443, 1080, 1000, 2443, 1080, 1200, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 599, 666, 2443, 900, 1000, 2443, 500, 555, 2443, 900, 1000, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 900, 1000, 2443, 1080, 1200, 2443, 791, 0, 2443, 450, 500, 2443, 599, 666, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 900, 1000, 2443, 599, 666, 2443, 1080, 1200, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 0, 0, 0, 1080, 1200, 2443, 900, 1000, 2443, 719, 799, 2443, 987, 1097, 2443, 900, 1000, 2443, 900, 1000, 2443, 599, 666, 2443, 1037, 1152, 2443, 900, 1000, 2443, 599, 666, 2443, 599, 666, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 900, 1000, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1080, 1200, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1080, 1200, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1080, 1200, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 500, 555, 2443, 500, 555, 2443, 500, 555, 2443, 500, 555, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 987, 1097, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 900, 1000, 2443, 1099, 1221, 2443, 1099, 1221, 2443, 1353, 1503, 2443, 1040, 1156, 2443, 1188, 1320, 2443, 1001, 1112, 2443, 599, 666, 2443, 599, 666, 2443, 900, 1000, 2443, 1569, 1744, 2443, 1569, 1744, 2443, 1334, 1482, 2443, 1200, 1333, 2443, 1299, 1444, 2443, 1274, 1416, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1033, 1148, 2443, 1200, 1333, 2443, 1040, 1156, 2443, 1227, 1364, 2443, 1099, 1221, 2443, 1612, 1792, 2443, 901, 1001, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1200, 1333, 2443, 1220, 1356, 2443, 1600, 1778, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1001, 1112, 2443, 1200, 1333, 2443, 1099, 1221, 2443, 1274, 1416, 2443, 1422, 1580, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1169, 1299, 2443, 1815, 2017, 2443, 1815, 2017, 2443, 1270, 1412, 2443, 1569, 1744, 2443, 1033, 1148, 2443, 1188, 1320, 2443, 1850, 2055, 2443, 1200, 1333, 2443, 798, 887, 2443, 915, 1017, 2443, 849, 944, 2443, 738, 820, 2443, 915, 1017, 2443, 798, 887, 2443, 1243, 1381, 2443, 711, 790, 2443, 963, 1070, 2443, 963, 1070, 2443, 874, 971, 2443, 898, 998, 2443, 1139, 1265, 2443, 963, 1070, 2443, 900, 1000, 2443, 963, 1070, 2443, 900, 1000, 2443, 798, 887, 2443, 786, 874, 2443, 900, 1000, 2443, 1166, 1295, 2443, 900, 1000, 2443, 963, 1070, 2443, 905, 1005, 2443, 1386, 1540, 2443, 1386, 1540, 2443, 930, 1034, 2443, 1209, 1343, 2443, 820, 912, 2443, 772, 858, 2443, 1344, 1494, 2443, 827, 919, 2443, 798, 887, 2443, 798, 887, 2443, 869, 965, 2443, 738, 820, 2443, 900, 1000, 2443, 900, 1000, 2443, 500, 555, 2443, 500, 555, 2443, 500, 555, 2443, 1308, 1454, 2443, 1301, 1446, 2443, 900, 1000, 2443, 874, 971, 2443, 963, 1070, 2443, 900, 1000, 2443, 963, 1070, 2443, 2110, 2344, 2443, 1139, 1266, 2443, 1207, 1341, 2443, 977, 1085, 2443, 1742, 1935, 2443, 1219, 1354, 2443, 1299, 1444, 2443, 1061, 1179, 2443, 1858, 2065, 2443, 1501, 1667, 2443, 1612, 1792, 2443, 1243, 1381, 2443, 2175, 2417, 2443, 1683, 1870, 2443, 901, 1001, 2443, 711, 790, 2443, 1328, 1475, 2443, 1126, 1251, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1464, 1626, 2443, 1059, 1177, 2443, 1464, 1626, 2443, 1059, 1177, 2443, 1971, 2190, 2443, 1583, 1759, 2443, 1372, 1525, 2443, 1018, 1131, 2443, 2183, 2425, 2443, 1425, 1583, 2443, 2110, 2344, 2443, 1139, 1266, 2443, 1200, 1333, 2443, 798, 887, 2443, 601, 667, 2443, 0, 0, 2443, 0, 0, 2443, 0, 0, 2443, 0, 0, 2443, 0, 0, 2443, 0, 0, 2443, 0, 0, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1033, 1148, 2443, 846, 940, 2443, 1001, 1112, 2443, 900, 1000, 2443, 810, 900, 2443, 631, 702, 2443, 1040, 1156, 2443, 738, 820, 2443, 1136, 1262, 2443, 927, 1030, 2443, 1612, 1792, 2443, 1243, 1381, 2443, 901, 1001, 2443, 711, 790, 2443, 1200, 1333, 2443, 874, 971, 2443, 1200, 1333, 2443, 874, 971, 2443, 1200, 1333, 2443, 874, 971, 2443, 1414, 1571, 2443, 1031, 1146, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1531, 1701, 2443, 1121, 1246, 2443, 1858, 2064, 2443, 1420, 1578, 2443, 1200, 1333, 2443, 798, 887, 2443, 1200, 1333, 2443, 798, 887, 2443, 1099, 1221, 2443, 786, 874, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1434, 1593, 2443, 1085, 1206, 2443, 1169, 1299, 2443, 905, 1005, 2443, 1169, 1299, 2443, 905, 1005, 2443, 1169, 1299, 2443, 900, 1000, 2443, 1581, 1756, 2443, 983, 1092, 2443, 1581, 1756, 2443, 983, 1092, 2443, 599, 666, 2443, 1612, 1792, 2443, 1243, 1381, 2443, 1200, 1333, 2443, 927, 1030, 2443, 1220, 1356, 2443, 898, 998, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1169, 1299, 2443, 905, 1005, 2443, 1600, 1778, 2443, 1139, 1265, 2443, 500, 555, 2443, 1299, 1444, 2443, 798, 887, 2443, 1299, 1444, 2443, 798, 887, 2443, 1600, 1778, 2443, 1200, 1333, 2443, 1099, 1221, 2443, 798, 887, 2443, 1299, 1444, 2443, 798, 887, 2443, 1299, 1444, 2443, 798, 887, 2443, 1612, 1792, 2443, 1243, 1381, 2443, 901, 1001, 2443, 711, 790, 2443, 901, 1001, 2443, 798, 887, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1188, 1320, 2443, 772, 858, 2443, 1274, 1416, 2443, 900, 1000, 2443, 1274, 1416, 2443, 900, 1000, 2443, 1274, 1416, 2443, 900, 1000, 2443, 1169, 1299, 2443, 905, 1005, 2443, 1040, 1156, 2443, 738, 820, 2443, 1569, 1744, 2443, 1209, 1343, 2443, 1040, 1156, 2443, 738, 820, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1033, 1148, 2443, 900, 1000, 2443, 1446, 1607, 2443, 1386, 1541, 2443, 1444, 1604, 2443, 1270, 1411, 2443, 1032, 1147, 2443, 814, 905, 2443, 1632, 1813, 2443, 1353, 1503, 2443, 1709, 1899, 2443, 1417, 1575, 2443, 1299, 1444, 2443, 815, 906, 2443, 1252, 1391, 2443, 1082, 1203, 2443, 901, 1001, 2443, 711, 790, 2443, 1220, 1356, 2443, 898, 998, 2443, 1854, 2060, 2443, 1285, 1428, 2443, 1473, 1637, 2443, 1241, 1378, 2443, 1687, 1875, 2443, 1273, 1415, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1698, 1887, 2443, 1299, 1444, 2443, 1200, 1333, 2443, 971, 1079, 2443, 1716, 1907, 2443, 1376, 1529, 2443, 1792, 1992, 2443, 1438, 1598, 2443, 1299, 1444, 2443, 963, 1070, 2443, 1169, 1299, 2443, 900, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 993, 1103, 2443, 744, 827, 2443, 1099, 1221, 2443, 786, 874, 2443, 599, 666, 2443, 599, 666, 2443, 1299, 1444, 2443, 976, 1084, 2443, 791, 1000, 2443, 791, 1000, 2443, 599, 666, 2443, 798, 887, 2443, 798, 887, 2443, 798, 887, 2443, 500, 555, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 599, 666, 2443, 599, 666, 2443, 1299, 1444, 2443, 500, 555, 2443, 1248, 1387, 2443, 1454, 1616, 2443, 740, 822, 2443, 791, 1000, 2443, 1299, 1444, 2443, 791, 1000, 2443, 1468, 1631, 2443, 1337, 1486, 2443, 484, 538, 2443, 1299, 1444, 2443, 1200, 1333, 2443, 1040, 1156, 2443, 1157, 1286, 2443, 1099, 1221, 2443, 1099, 1221, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 599, 666, 2443, 1299, 1444, 2443, 1305, 1450, 2443, 1600, 1778, 2443, 1299, 1444, 2443, 1157, 1286, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1001, 1112, 2443, 791, 1000, 2443, 1047, 1164, 2443, 1099, 1221, 2443, 1299, 1444, 2443, 1315, 1461, 2443, 1299, 1444, 2443, 1328, 1475, 2443, 1337, 1486, 2443, 599, 666, 2443, 1299, 1444, 2443, 943, 1047, 2443, 755, 839, 2443, 941, 1045, 2443, 484, 538, 2443, 891, 990, 2443, 943, 1047, 2443, 915, 1017, 2443, 795, 883, 2443, 848, 942, 2443, 755, 839, 2443, 745, 828, 2443, 941, 1045, 2443, 862, 958, 2443, 484, 538, 2443, 907, 1007, 2443, 872, 969, 2443, 965, 1072, 2443, 813, 904, 2443, 802, 891, 2443, 900, 1000, 2443, 908, 1009, 2443, 898, 998, 2443, 712, 792, 2443, 970, 1078, 2443, 723, 803, 2443, 891, 990, 2443, 1038, 1154, 2443, 798, 887, 2443, 1126, 1251, 2443, 1184, 1316, 2443, 484, 538, 2443, 891, 990, 2443, 900, 1000, 2443, 891, 990, 2443, 1184, 1316, 2443, 1188, 1320, 2443, 915, 1017, 2443, 891, 990, 2443, 1299, 1444, 2443, 1602, 1780, 2443, 1299, 1444, 2443, 947, 1052, 2443, 1184, 1316, 2443, 1008, 1120, 2443, 1299, 1444, 2443, 900, 1000, 2443, 1200, 1333, 2443, 755, 839, 2443, 1001, 1112, 2443, 804, 893, 2443, 1036, 1151, 2443, 812, 902, 2443, 1316, 1462, 2443, 996, 1107, 2443, 1490, 1656, 2443, 1400, 1555, 2443, 1108, 1231, 2443, 937, 1042, 2443, 1190, 1322, 2443, 798, 887, 2443, 975, 1083, 2443, 975, 1083, 2443, 1181, 1312, 2443, 1045, 1162, 2443, 1258, 1398, 2443, 915, 1017, 2443, 855, 950, 2443, 694, 771, 2443, 1008, 1120, 2443, 915, 1017, 2443, 798, 887, 2443, 500, 555, 2443, 1299, 1444, 2443, 728, 809, 2443, 728, 809, 2443, 1001, 1112, 2443, 900, 1000, 2443, 1200, 1333, 2443, 1600, 1778, 2443, 1139, 1265, 2443, 898, 998, 2443, 1200, 1333, 2443, 1200, 1333, 2443, 1200, 1333, 2443, 1525, 1695, 2661, 986, 1095, 2661, 889, 988, 2443, 1142, 1269, 2661, 1142, 1269, 2661, 1726, 1917, 2661, 1101, 1223, 2443, 1477, 1641, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1230, 1367, 2661, 1481, 1646, 2443, 1436, 1595, 2661, 1283, 1425, 2443, 1080, 1200, 2443, 1230, 1367, 2661, 1230, 1367, 2661, 300, 333, 2443, 1406, 1562, 2661, 1023, 1136, 2661, 891, 990, 2661, 450, 500, 2443, 987, 1097, 2443, 1539, 1710, 2661, 1539, 1710, 2661, 1404, 1560, 2661, 1283, 1425, 2443, 1762, 1958, 2443, 1230, 1367, 2661, 1230, 1367, 2661, 1168, 1298, 2661, 534, 593, 2661, 836, 929, 2661, 813, 904, 2661, 1114, 1238, 2661, 1406, 1562, 2661, 1406, 1562, 2661, 1299, 1444, 2443, 1262, 1403, 2661, 493, 547, 2443, 1476, 1640, 2661, 1910, 2123, 2661, 1284, 1427, 2661, 1698, 1887, 2661, 2139, 2376, 2661, 1184, 1316, 2661, 1378, 1531, 2661, 1378, 1531, 2661, 1253, 1392, 2661, 1253, 1392, 2661, 390, 433, 2661, 1253, 1392, 2661, 1230, 1367, 2661, 1241, 1379, 2661, 1253, 1392, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1219, 1354, 2661, 1270, 1411, 2661, 638, 709, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 987, 1097, 2443, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1415, 1572, 2661, 1415, 1572, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1235, 1373, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 987, 1097, 2443, 1015, 1127, 2443, 1230, 1367, 2661, 1230, 1367, 2661, 987, 1097, 2443, 987, 1097, 2443, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1645, 1828, 2661, 1645, 1828, 2661, 808, 898, 2661, 1230, 1367, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1233, 1371, 2661, 1233, 1371, 2661, 1233, 1371, 2661, 1233, 1371, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1262, 1403, 2661, 1262, 1403, 2661, 1262, 1403, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1517, 1685, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1453, 1615, 2661, 1453, 1615, 2661, 935, 1039, 2661, 935, 1039, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1455, 1617, 2661, 1241, 1378, 2661, 1241, 1378, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1546, 1718, 2661, 1546, 1718, 2661, 1172, 1302, 2661, 1230, 1367, 2661, 1049, 1166, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1303, 1448, 2661, 1589, 1765, 2661, 1589, 1765, 2661, 1262, 1403, 2661, 1262, 1403, 2661, 991, 1101, 2661, 601, 667, 2661, 929, 1033, 2661, 1230, 1367, 2661, 1455, 1617, 2661, 1458, 1621, 2661, 1458, 1621, 2661, 1479, 1643, 2661, 1479, 1643, 2661, 1270, 1411, 2661, 1406, 1562, 2661, 1406, 1562, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1262, 1403, 2661, 1262, 1403, 2661, 1262, 1403, 2661, 1230, 1367, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 2125, 2361, 2661, 2125, 2361, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1160, 1289, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1265, 1406, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1270, 1411, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 1230, 1367, 2661, 601, 667, 2661, 1705, 1895, 2661, 1706, 1896, 2661, 1706, 1896, 2661, 1376, 1529, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1288, 1431, 2661, 1288, 1431, 2661, 1376, 1529, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1288, 1431, 2661, 1050, 1167, 2661, 1265, 1406, 2661, 1110, 1233, 2443, 1200, 1333, 2443, 1200, 1333, 2443, 900, 1000, 2443, 900, 1000, 2443, 1400, 1555, 2443, 1299, 1444, 2443, 1743, 1937, 2443, 1982, 2203, 2443, 1698, 1887, 2443, 1397, 1552, 2443, 922, 1025, 2443, 900, 1000, 2443, 1299, 1444, 2443, 1099, 1221, 2443, 1800, 2000, 2443, 900, 1000, 2443, 1001, 1112, 2443, 1299, 1444, 2443, 1299, 1444, 2443, 1001, 1112, 2443, 1200, 1333, 2443, 900, 1000, 2443, 900, 1000, 2443, 1099, 1221, 2443, 900, 1000, 2443, 900, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 900, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443, 791, 1000, 2443]);

	function objToArr(obj) {
		let arr = [];
		for (let p in obj) {
			arr.push(obj[p]);
		}
		return arr;
	}
	if (typeof Math.LN2 == "undefined")
		Math.LN2 = Math.log(2);
	if (typeof Math.log2 == "undefined")
		Math.log2 = function (n) {
			return Math.log(n) / Math.LN2;
		};

	function  *a(alphabet) {
		for (let a of alphabet) {
			for (let i = a[0]; i <= a[1]; i++)
				yield String.fromCharCode(i);
		}
	}
	
	function load(nm,def){
		let res=null;
		try{
			if(sessionStorage[nm]){
				res=sessionStorage[nm];
			}
		}catch(e){};
		if(!res){
			const srx = new RegExp(nm + "=([^;]+)(;|$)", "");
			let m = document.cookie.match(srx);
			if(m)
				return m[1];
		}
		return res?res:def;
	}
	function save(nm,res){
		try{
			sessionStorage[nm]=res;
			document.cookie = nm + "=;";
		}catch(e){
			document.cookie = nm + "="+res+";";
			try{
				sessionStorage.clear();
			}catch(e){}
		};
	}
	function clear(nm){
		try{
			//delete sessionStorage[nm];
			sessionStorage.clear();
		}catch(e){}
		document.cookie = nm + "=;";
	}

	function randomString(len) {
		let str = "";
		for (let i = 0; i < len; i++) {
			str += String.fromCharCode(0x41 + Math.round((0x5A - 0x41) * Math.random()));
		}
		return str;
	}
	let stats = new Array(alphabetLength * charVecSize);
	for (let i = 0; i < stats.length; i++) {
		stats[i] = {};
	}
	
	
	function doFingerprinting(evt) {
		let canv = document.createElement("CANVAS");
		canv.height = canv.width = windSize;
		canv.style.height = canv.style.width = windSize + "em";
		let ctx = canv.getContext("2d");
		ctx.fillStyle = "black";

		let d = document.createElement("DIV");
		d.style.position = "fixed";
		d.style.left = d.style.top = "0px";
		d.style.zIndex = -1000;
		d.style.visibility = "hidden";
		document.body.appendChild(d);

		let fonts = defFonts;

		let prb = document.getElementById("pr");
		let tprb = document.getElementById("tpr");
		prb.value = 0;
		
		const storageVarName = "fingerprint";
		let res = JSON.parse(load(storageVarName,'{"it" : 0,"fonts" : {},"fontFingerprintingTotalTime" : 0.0}'));
		console.log(res);

		let blkLen = Math.ceil(Math.log2(alphabetLength * charVecSize));

		fonts = fonts.filter((f) => typeof res.fonts[f] == "undefined");
		let resultBox = document.getElementById("res");
		let resultPre = document.getElementById("resPre");

		if (res.it == countOfIts) {
			res.fonts["serif"] = {
				d : res.serifHash,
				fonts : []
			};
			res.fonts["sans-serif"] = {
				d : res.sansHash,
				fonts : []
			};
			res.fonts["monospace"] = {
				d : res.monoHash,
				fonts : []
			};
			for (let f of fonts) {
				let fnt = hashFont(f);
				if (fnt.d == res.serifHash)
					res.fonts["serif"].fonts.push(f);
				else if (fnt.d == res.serifHash)
					res.fonts["sans-serif"].fonts.push(f);
				else
					res.fonts["monospace"].fonts.push(f);
			}
			let resText = JSON.stringify(res.fonts, null, "\t");
			resultPre.innerHTML = resText;
			resultBox.innerHTML += "<br/>Milliseconds per font: " + res.fontFingerprintingTotalTime / (fonts.length * countOfIts);
			let downlink=document.createElement("A");
			downlink.download="fingerprint.json";
			downlink.textContent="Download fingerprint";
			{
				const mime="application/json";
				try{
					downlink.href=URL.createObjectURL(new Blob([resText],{type:mime}));
				}catch(ex){
					downlink.href="data:"+mime+","+encodeURIComponent(resText);
				}
			}
			resultBox.parentElement.appendChild(downlink);
			clear(storageVarName);
			return;
		}
		tprb.value = res.it / countOfIts;
		document.title += (" (" + res.it + "/" + countOfIts + ")");

		function hashFont(f) {
			let processedChars = 0;
			let resArr = new Int8Array(alphabetLength * charVecSize);
			let bl = new BLAKE2s(blkLen, []);
			d.style.font = ctx.font = Math.floor(windSize * 0.9) + "em " + f;

			let time = -window.performance.now();
			for (let c of a(alphabet)) {
				ctx.clearRect(0, 0, windSize, windSize);
				d.innerHTML = c;
				let rect = d.getBoundingClientRect();
				let measurement = new Int8Array([
							ctx.measureText(c).width - reference[charVecSize * processedChars],
							rect.width - reference[charVecSize * processedChars + 1],
							rect.height - reference[charVecSize * processedChars + 2]
						]);
				resArr.set(measurement, charVecSize * processedChars);
				bl.update(measurement.buffer);
				processedChars++;
			}
			let dig = bl.hexDigest();
			time += window.performance.now();
			return {
				t : time,
				d : dig
			};
		}

		if (!res.it) {
			res.serifHash = hashFont("serif").d;
			res.sansHash = hashFont("sans-serif").d;
                        res.monoHash = hashFont("monospace").d;
		}
		let curr = 0;
		for (let f of fonts) {
			let fnt = hashFont(f);
			res.fontFingerprintingTotalTime += fnt.t;
			if (fnt.d != res.serifHash && fnt.d != res.sansHash && fnt.d != res.monoHash) {
				res.fonts[f] = fnt.d;
			}
			prb.value = (++curr) / fonts.length;
		}

		res.it++;
		resultPre.innerHTML = JSON.stringify(res, null, "\t");
		save(storageVarName, JSON.stringify(res));
		window.location.reload();
	}
	document.addEventListener("DOMContentLoaded", doFingerprinting, false);
})();
