'use server';

import cloudinary from '@/libs/cloudinary';
import connectdb from '@/libs/connectdb';
import uploadImage from '@/libs/uploadImage';
import { Category } from '@/models/categoryShema';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

// submit category
export const submitCategory = async (prevData, formData) => {
  const prev = prevData;
  const file = formData.get('file');
  const title = formData.get('title');

  try {
    if (!title || !file || file.size === 0) {
      return {
        success: false,
        message: 'Please fill in all required fields!!',
      };
    }

    const image = await uploadImage(file);
    const slug = slugify(title).toLowerCase();

    await connectdb();
    const exists = await Category.findOne({ slug });
    if (exists) {
      return {
        success: false,
        message: 'Category already defined',
      };
    }

    await Category.create({
      title: title,
      image: image,
      slug: slug,
    });
    revalidatePath('/admin/categories');

    return {
      success: true,
      message: 'Category submit successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// get category

export const getCategory = async () => {
  try {
    await connectdb();

    const category = await Category.find();

    return {
      success: true,
      message: 'Category get successfully',
      category: JSON.parse(JSON.stringify(category)),
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// delete category
export const deleteCategory = async (slug, public_id) => {
  try {
    await connectdb();

    const existsCategory = await Category.findOne({ slug: slug });
    if (!existsCategory) {
      return {
        success: false,
        message: 'Category not found! Plase try again later',
      };
    }

    // delete category => DB
    await Category.findOneAndDelete({ slug: slug });
    // delete image => cludinary
    cloudinary.uploader.destroy(public_id);
    revalidatePath('/admin/categories');
    return {
      success: true,
      message: 'Category Delete successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

 
