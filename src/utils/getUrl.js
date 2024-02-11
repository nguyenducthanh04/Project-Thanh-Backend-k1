module.exports = {
    getUrl: (req, page) => {
      const query = req.query;
      query.page = page;
      return new URLSearchParams(query).toString();//chuyển query thành chuỗi
    },
  };
  