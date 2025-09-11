'use server';

import BikePathDBController from "@/lib/controllers/BikePathDBController";

const controller = new BikePathDBController();

export async function createPath(path) {
    return await controller.createPath(path);
}

export async function deletePath(id) {
    return await controller.deletePath(id);
}

export async function findPathByName(name) {
    return await controller.findPathByName(name);
}

export async function toggleAddDelete(path) {
    const checkPath = await controller.findPathByName(path.title);

    if (checkPath) {
        await deletePath(checkPath.id);
        return { added: false };
    } else {
        await createPath(path);
        return { added: true };
    }
}