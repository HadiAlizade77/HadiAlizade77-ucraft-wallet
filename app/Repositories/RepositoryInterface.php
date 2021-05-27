<?php


namespace App\Repositories;


interface RepositoryInterface
{
    /**
     * Get all
     * @return mixed
     */
    public function all();

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id);

    /**
     * Update and create
     * @param array $attributes
     * @return mixed
     */
    public function save(array $attributes);


    /**
     * Delete
     * @param $id
     * @return mixed
     */
    public function delete($id);
}
