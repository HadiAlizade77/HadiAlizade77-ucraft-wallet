<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    /**
     * @param string $errorMessage
     * @return JsonResponse
     */
    protected function errorResponse($errorMessage = 'error'): JsonResponse
    {
        return response()->json(['status' => 'error', 'message' => $errorMessage],500);
    }

    /**
     * @param array $data
     * @param string $message
     * @return JsonResponse
     */
    protected function successResponse($data = [], $message = 'success'): JsonResponse
    {
        return response()->json(['status' => 'success', 'message' => $message, 'data' => $data]);
    }
}
