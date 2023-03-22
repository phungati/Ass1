import productModel from "../models/product";
import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
})

export const getAll = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "Tất cả sản phẩm",
            products
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const products = await productModel.findById(req.params.id);
        return res.status(200).json({
            message: "Thông tin sản phẩm",
            products
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

export const create = async (req, res) => {
    const { error } = productSchema.validate(req.body)
    if (error) {
        return res.status(404).json({
            message: error.details[0].message
        });
    }

    try {
        const product = await productModel.create(req.body);
        return res.status(201).json({
            message: "Thêm sản phẩm thành công!",
            product
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

export const edit = async (req, res) => {
    const { error } = productSchema.validate(req.body)
    if (error) {
        return res.status(404).json({
            message: error.details[0].message
        });
    }

    try {
        const product = await productModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(201).json({
            message: "Sửa sản phẩm thành công!",
            product
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

export const del = async (req, res) => {
    try {
        const product = await productModel.findOneAndDelete({ _id: req.params.id });
        return res.status(201).json({
            message: "Xóa sản phẩm thành công!",
            product
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}