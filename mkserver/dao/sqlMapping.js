var sqlmap = {
  login_web: 'select * from user where username = ? and password = ? and enableweb = 1',
  login_app: 'select * from user where username = ? and password = ? and enableapp = 1',
  getstorearea: 'select * from store_area',
  getstorebasic: 'SELECT store.*, System_name,Region_name from store left join store_area on (store.System_id=store_area.System_id AND store.Region_id=store_area.Region_id )',
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
  insertplan: 'insert into emergency_plan(name,createtime,createuser,detail,groupid) values(?,?,?,?,?)',
  updateplan: 'update emergency_plan set name=?,detail=? where id = ?',
  deleteplan: 'delete from emergency_plan where id = ?',
  queryallplan: 'select a.*,b.name createusername from emergency_plan a INNER JOIN user b ON a.createuser = b.id',
  queryplan: 'select a.*,b.name createusername from emergency_plan a INNER JOIN user b ON a.createuser = b.id where a.id = ?',
};

module.exports = sqlmap;
