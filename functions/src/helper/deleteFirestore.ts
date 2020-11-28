export const deleteDocument = async (doc: FirebaseFirestore.DocumentReference) => {
    const collections = await doc.listCollections()
    collections.forEach(async collection => await deleteCollection(collection))
    await doc.delete()
}

export const deleteCollection = async (collection: FirebaseFirestore.CollectionReference) => {
    while (true) {
        const docs = await collection.limit(100).get()
        if (docs.empty) {
            return
        }
        docs.forEach(async doc => await deleteDocument(doc.ref))
    }
}