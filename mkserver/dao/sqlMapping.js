var sqlmap = {
  login_web: 'select a.*,b.name departname from user a INNER JOIN department b on (a.depart = b.id) where username = ? and password = ? and enableweb = 1',
  login_app: 'select a.*,b.name departname from user a INNER JOIN department b on (a.depart = b.id) where username = ? and password = ? and enableapp = 1',
  getstorearea: 'select * from store_area',
  getstorebasic: 'SELECT store.*, System_name,Region_name,Contacts_name,Tel from store left join store_area on (store.System_id=store_area.System_id AND store.Region_id=store_area.Region_id ) INNER JOIN store_contacts on (store_contacts.Store_id = store.Store_id)',
  getstorecontacts: 'select store_contacts.*,Store_name from store_contacts left join store on (store_contacts.Store_id = store.Store_id)',
  getstoredisplay: 'select * from store_display',
  getproduct: 'select * from product',
  getproductpricecount: 'select count(*) from product_price',
  getproductprice: 'select product_price.*,Store_name,Product_name from product_price left join store on (product_price.Store_id = store.Store_id ) left join product on (product_price.Product_id = product.Product_id) limit ?,10',
  getproductstockcount: 'select count(*) from product_stock',
  getproductstock: 'select product_stock.*,Store_name,Product_name from product_stock left join store on (product_stock.Store_id = store.Store_id ) left join product on (product_stock.Product_id = product.Product_id) limit ?,10',
  getproductbrand: 'select * from product_brand',
  getpromotiontype: 'select * from promotion_type order by promotion_type',
  getpromotioncount: 'select count(*) from promotion',
  getpromotion: 'select promotion.*,Store_name,Product_name from promotion left join store on (promotion.Store_id = store.Store_id ) left join product on (promotion.Product_id = product.Product_id) left join promotion_type on (promotion.Promotion_type = promotion_type.Promotion_type) limit ?,10',
  getuser: 'select * from user',
  adduser: 'insert into user(username,password,realname,phone,email,depart,role,enableweb,enableapp) values(?,?,?,?,?,?,?,?,?)',
  moduser: 'update user set username = ? , password = ?, realname = ?, phone = ?, email = ?, depart = ?, role = ?, enableweb = ?, enableapp = ? where id = ?',
  deluser: 'delete from user where id = ?',
  getdepart: 'select * from department',
  adddepart: 'insert into department(name,parentid,userid,path) values(?,?,?,?)',
  moddepart: 'update department set name = ? , userid = ? , path = ? where id = ?',
  deldepart: 'delete from department where id = ?',
  getpermissontype: 'select * from permissontype',
  getrole: 'select * from role',
  addrole: 'insert into role(name,permisson) values(?,?)',
  modrole: 'update role set name = ? , permisson = ? where id = ?',
  delrole: 'delete from role where id = ?',
  getpath: 'select * from path',
  getpathdetail: 'select a.*,b.Store_name from path_detail a INNER JOIN store b on(a.Store_id = b.Store_id)',
  getpath_app: 'select a.*,Path_name,Store_name from path_detail a INNER JOIN path b on (a.path_id = b.path_id) INNER JOIN store c on (a.store_id = c.store_id) where c.store_id in (select store_id from store where user_id = ?) order by a.path_seq,a.Path_id',
  getplan: 'select a.*,b.Path_Name,c.Store_name from plan a LEFT JOIN path b ON (a.Path_Id = b.Path_id) LEFT JOIN store c on (c.Store_id = a.store_id)',
  addplan: 'insert into plan (Plan_Type,Plan_Date,Path_Id,Store_Id,Store_Name,User_Id) values (?,?,?,?,?,?)', 
  delplan: 'delete from plan where userid = ? and year = ? and month = ? and day = ?',
  getplansum: 'select * from plan_sum where userid = ? and year = ?',
  updateplansum: 'replace into plan_sum(userid,year,month,storeCount,storeACount,storeBCount,storeCCount,storeA,storeB,storeC,cover) VALUES(?,?,?,?,?,?,?,?,?,?,?) ',
  insertplan: 'insert into plan(userid,year,month,day,plan_type,path_id,store_id) values(?,?,?,?,?,?,?) ',
  getstoreproduct: 'select a.*,b.Product_name,b.Brand_id from product_price a INNER JOIN product b on(a.Product_id = b.product_id) where Store_id = ?',
  signin: 'update plan set signin_time=?,signin_gps_x=?,signin_gps_y=? where userid=? and year=? and month=? and day=? and store_id=? ',
  signout: 'update plan set signout_time=?,signout_gps_x=?,signout_gps_y=?,isfinish=1 where userid=? and year=? and month=? and day=? and store_id=? '

};

module.exports = sqlmap;
