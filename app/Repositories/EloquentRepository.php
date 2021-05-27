<?php
namespace App\Repositories;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\RepositoryInterface;

abstract class EloquentRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * EloquentRepository constructor.
     * @throws BindingResolutionException
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * Get model.
     * @return string
     */
    abstract protected function getModel(): string;

    /**
     * Set model.
     * @throws BindingResolutionException
     */
    public function setModel()
    {
        $this->model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Get all.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Update and Create
     * @param array $attributes
     * @return bool
     */
    public function save(array $attributes): bool
    {
        if (isset($attributes['id'])){
            return $this->find($attributes['id'])->fill($attributes)->save();
        }
        return $this->model->fill($attributes)->save();
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id): bool
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();
            return true;
        }

        return false;
    }

    /**
     * Make a new instance of the entity to query on.
     * @param array $with
     * @return Builder
     */
    public function make(array $with = []): Builder
    {
        return $this->model->with($with);
    }

}
