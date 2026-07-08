'use server';

import cloudinary from '@/libs/cloudinary';
import connectdb from '@/libs/connectdb';
import uploadImage from '@/libs/uploadImage';
import { Category } from '@/models/categoryShema';
import { Product } from '@/models/productShema';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

// submit product
export const submitProduct = async (fileData, prevData, formData) => {
  const prev = prevData;

  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const discountPrice = formData.get('discountprice');
  const category = formData.get('category');
  const slug = slugify(title).toLowerCase();
  const stock = formData.get('stock');
  const width = formData.get('width');
  const height = formData.get('height');
  const packages = formData.get('packages');
  const brand = formData.get('brand');
  const isnew = formData.get('isnew');
  const isFeatured = formData.get('isfeatured');

  try {
    if (
      !title ||
      !description ||
      !price ||
      !discountPrice ||
      !category ||
      !stock ||
      !width ||
      !height ||
      !packages ||
      !brand ||
      !isnew ||
      !isFeatured ||
      fileData.length < 3
    ) {
      return {
        success: false,
        message: 'Please fill in all required fields!!',
      };
    }

    //console.log('========fileData==========', fileData);
    const images = await Promise.all(
      fileData.map(async item => await uploadImage(item)),
    );

    await connectdb();

    await Product.create({
      title: title,
      description: description,
      price: price,
      discountPrice: discountPrice,
      category: category,
      images: images,
      slug: slug,
      stock: stock,
      widh: width,
      height: height,
      packages: packages,
      brand: brand,
      isFeatured: isFeatured === 'true',
      isNew: isnew === 'true',
    });
    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product submit successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

export const getProducts = async params => {
  const query = params || {};
  const search = query.search;
  const category = query.category;
  const min = query.min;
  const max = query.max;
  const page = query.page || 1;

  const size = 8;
  const skip = (page - 1) * size;

  try {
    await connectdb();
    const filter = {};

    //  search
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    // category
    if (category) {
      const exsitsCategory = await Category.findOne({ slug: category });
      if (exsitsCategory) {
        filter.category = exsitsCategory;
      }
    }
    //min and max
    if (min || max) {
      filter.price = { $gte: min, $lte: max };
    }

    // pagination t
    const total = await Product.countDocuments(filter);
    const totalPage = Math.ceil(total / size);

    const product = await Product.find(filter)
      .populate('category')
      .skip(skip)
      .limit(size)
      .sort({ createdAt: -1 });

    if (!product) {
      return {
        success: false,
        message: 'Product not found! Plase try again later',
      };
    }

    return {
      success: true,
      message: 'Product get successfully',
      product: JSON.parse(JSON.stringify(product)),
      totalPage,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
      er: err.message,
    };
  }
};

// get single product
export const getSingleProduct = async id => {
  try {
    const product = await Product.findOne({ _id: id }).populate('category');
    if (!product) {
      return {
        success: false,
        message: 'Product not Found!!',
      };
    }
    return {
      success: true,
      message: 'Product get successfully',
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong!! please try again later ',
    };
  }
};
// get single product
export const getAllProduct = async () => {
  try {
    const product = await Product.find();
    if (!product) {
      return {
        success: false,
        message: 'Product not Found!!',
      };
    }
    return {
      success: true,
      message: 'Product get successfully',
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong!! please try again later ',
    };
  }
};

// delete product
export const deleteProduct = async (productID, productImages) => {
  try {
    await connectdb();

    const existsProduct = await Product.findOne({ _id: productID });
    if (!existsProduct) {
      return {
        success: false,
        message: 'Product not found! Plase try again later',
      };
    }

    // delete product => DB
    await Product.findOneAndDelete({ _id: productID });

    // delete image => cludinary
    const res = productImages.map(item => {
      cloudinary.uploader.destroy(item.public_id);
    });
    await Promise.allSettled(res);

    revalidatePath('/admin/products');
    return {
      success: true,
      message: 'Product Delete successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
      er: err.message,
    };
  }
};
  