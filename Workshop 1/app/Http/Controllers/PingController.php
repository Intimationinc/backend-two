<?php

namespace App\Http\Controllers;

use App\Events\SendPrivatePing;
use App\Events\SendPublicPing;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PingController extends Controller
{
    public function private($receiverId)
    {
        $receiverUser = User::findOrFail($receiverId);
        $senderUser = auth()->user();
        $message = "Dear {$receiverUser->name}, you have a new ping! from {$senderUser->name}";

        broadcast(new SendPrivatePing(
            $receiverUser,
            $message
        ));

        return redirect()->back();
    }

    public function public(Request $request)
    {
        $request->validate([
            'message' => ['required', 'string'],
        ]);

        DB::transaction(function () use ($request) {
            $message = Message::create([
                'message' => $request->message,
            ]);

            broadcast(new SendPublicPing($message->message));
        });

        return redirect()->back();
    }
}
