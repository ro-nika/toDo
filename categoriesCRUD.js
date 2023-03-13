
const $categoryCrudModal = document.querySelector('#modalCatergoryCrud')
const $closeModalCRUDBtn = document.querySelector('.close_categoryCrud-btn')
const $editCategoryInput = document.querySelector('.editCategoryInput')
const $editCategoryBtn = document.querySelector('.editCategoryBtn')
const $deleteCategoryBtn = document.querySelector('.deleteCategoryBtn')

$closeModalCRUDBtn.addEventListener('click', closeCategoryCrudModal)

window.addEventListener('click', (e) => {
    if (e.target === $categoryCrudModal) {
        closeCategoryCrudModal()
    }
})

// Events when keys press
document.addEventListener('keydown', e => {
    if ($categoryCrudModal.style.display === 'none') return


    if (e.key === 'Escape') {
        closeCategoryCrudModal()
    }
})

// Open modal function
function openCategoryCrudModal(categoryID) {
    const allCategories = getCategories()

    const foundCategory = allCategories.find(category => category.id === categoryID)

    $editCategoryInput.value = foundCategory.title

    $categoryCrudModal.style.display = 'block'

    $editCategoryInput.dataset.categoryId = categoryID

    $editCategoryInput.focus()
}

// Close modal function
function closeCategoryCrudModal() {
    $categoryCrudModal.style.display = 'none'
}


// Edit category action

$editCategoryBtn.addEventListener('click', () => {

    if (isValidated($editCategoryInput)) {
        const categories = getCategories()

        const newCategories = categories.map(category => {
            if (category.id === +$editCategoryInput.dataset.categoryId) {
                return {
                    ...category,
                    title: $editCategoryInput.value
                }
            }

            return category
        })

        setCategories(newCategories)
        reloadPage()
    }

})

// Delete category action

$deleteCategoryBtn.addEventListener('click', () => {
    const askCategoryDelete = confirm('Вы действительно хотите удалить данную категорию?')

    if (!askCategoryDelete) return

    const categoryId = $editCategoryInput.dataset.categoryId

    const updatedCategories = getCategories().filter(category => category.id !== +categoryId)
    const newTodos = getTodos().filter(todo => todo.category !== categoryId)

    setCategories(updatedCategories)
    setTodos(newTodos)

    reloadPage()

})