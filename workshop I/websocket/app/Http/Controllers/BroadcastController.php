<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;

class BroadcastController extends Controller
{
    public function index(Request $request){
        $message = $request->get("message");
        $channel = $request->get("channel");
        $receiver = $request->get("receiver");

        if ($receiver) {
            $channel .= "-" . $receiver;
        }

        if (empty($message) || empty($channel)){
            return response()->json(["message"=> "Message and Channel Info is Required"], 400);
        }

        event(new MessageEvent($message, $channel));
        return response()->json(["message"=> "Success"],200);
    }
}
