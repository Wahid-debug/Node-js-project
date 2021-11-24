const postModel = require("../models/posts");

const CreatePostData = async (req, res) => {
  try {
    console.log(req.file, "filessss");
    const { title, description } = req.body;
    const postData = await postModel({
      title,
      description,
      image: req.file.filename,
      user: req.user,
    });
    const createPost = await postData.save();
    console.log(createPost, "createPost");
    return res.status(200).json({ status: true, data: createPost });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ status: false, message: "something went wrong" });
  }
};

// const getPostData = async (req, res) => {
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//   const skipIndex = (page - 1) * limit;
//   try {
//     const data = await postModel.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "user",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       {
//         $project: {
//           title: 1,
//           description: 1,
//           image: 1,
//           user: {
//             fname: 1,
//           },
//         },
//       },
//       { $limit: limit },
//       { $skip: skipIndex },
//       // { $countDocuments: { totalPages: { $sum: 1 } } },
//     ]);

//     if (!data) {
//       return res
//         .status(401)
//         .json({ status: false, message: "You'r unAuthorized" });
//     }
//     // const totalDocument = await postModel.aggregate([{
//     // 	$group:{
//     // 		_id: null,
//     // 		totalPages: {
//     // 			$sum: 1
//     // 		}
//     // 	}
//     // }])
//     console.log(data);
//     return res.status(200).json({ status: true, data });
//   } catch (e) {
//     console.log(e);
//     return res.json({ error: e, message: "Data did not found" });
//   }
// };

const getPostData = async (req, res) => {
  try {
    const totalPosts = await postModel.countDocuments("data");
    const { page, size } = req.query;

    if (!page) {
      2;
    }
    if (!size) {
      2;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const data = await postModel
      .find()
      .limit(limit)
      .skip(skip)
      .populate({ path: "user", select: "fname" });

    res.status(200).json({
      status: true,
      totalPages: Math.ceil(totalPosts / page),
      totalResult: totalPosts,
      Page: page,
      Per_Page: size,
      data,
    });
    console.log({
      status: true,
      totalPages: Math.ceil(totalPosts / page),
      totalResult: totalPosts,
      Page: page,
      Per_page: size,
      data,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

const searchData = async (req, res) => {
  try {
    const regex = new RegExp(req.params.title);
    const data = await postModel.find({ title: regex });
    res.status(200).json({ status: true, data: data });
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

module.exports = { CreatePostData, getPostData, searchData };
