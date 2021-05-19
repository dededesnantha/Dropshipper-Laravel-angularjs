<?php

namespace App\Helpers;

use Exception;

/**
 * Manage notifications through Firebase.
 *
 * @author  Adithya Harun Tular <adit@colony.id>
 */
class Notification
{
    /**
     * @param array $options Title of the message.
     * @return mixed
     * @throws Exception
     */
    public static function send($options)
    {
        // Validate parameters.
        
        self::validate($options, ['to', 'title', 'body']);
    
        // Set request body.
        $fields = [
            'to' => $options['to'],
            'content_available' => isset($options['content_available']) ? $options['content_available'] : true,
            'priority' => isset($options['priority']) ? $options['priority'] : 'high',
            'notification' => [
                'title' => $options['title'],
                'body' => $options['body'],
                'sound' => 'default',
                'icon' =>  $options['icon'],
            ],
            'apns' => [
                'headers' => [
                    'apns-push-type' => 'alert'
                ]
            ]
        ];

        if (isset($options['click_action']) && !empty($options['click_action'])) {
            $fields['click_action'] = $options['click_action'];
        }

        if (isset($options['data']) && !empty($options['data'])) {
            $fields['data'] = $options['data'];
        }
        // Send to FCM server.
        return self::execute($fields);
    }

    /**
     * @param array $fields Message options and payloads.
     * @return mixed
     * @throws Exception
     */
    protected static function execute($fields)
    {
        $key = env('FIREBASE_CLOUD_MESSAGING_KEY');
        if (empty($key)) {
            throw new Exception('Firebase server key is not defined.
                Please check your environment variables and try again.');
        }

        // Set headers.
        $headers = [
            "Authorization: key={$key}", // your server key
            'Content-Type: application/json'
        ];

        // Init cURL.
        $ch = curl_init();

        // Set cURL options.
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

        // Execute and get the response.
        $response = curl_exec($ch);

        $result = [
            'info' => curl_getinfo($ch),
            'error' => curl_error($ch),
            'response' => json_decode($response, true),
        ];

        curl_close($ch);

        return $result;
    }

    /**
     * @param string $operation The operation to run. Valid values are create, add, and remove.
     * @param string $notification_key_name The user-defined name of the device group to create or modify.
     * @param string $notification_key Unique identifier of the device group. This value is returned in the response for a successful create operation, and is required for all subsequent operations on the device group.
     * @param array $registration_ids The device tokens to add or remove. If you remove all existing registration tokens from a device group, FCM deletes the device group.
     * @param mixed $callback
     * @return mixed
     * @throws Exception
     */
    public static function deviceGroup(
        $operation,
        $notification_key_name,
        $notification_key,
        $registration_ids,
        $callback = null
    ) {
        $key = env('FIREBASE_CLOUD_MESSAGING_KEY');

        // Check valid operations.
        if (!in_array($operation, ['create', 'add', 'remove'])) {
            throw new Exception('Invalid device group operation. Valid values are "create", "add", or "remove".');
        }

        if (empty($key)) {
            throw new Exception('Firebase server key is not defined.
                Please check your environment variables and try again.');
        }

        // Set fields.
        $fields = [
            'operation' => $operation,
            'notification_key_name' => $notification_key_name,
            'registration_ids' => $registration_ids
        ];

        if ($operation !== 'create') {
            $fields['notification_key'] = $notification_key;
        }

        // Set headers.
        $headers = [
            "Authorization: key={$key}", // your server key
            'Content-Type: application/json'
        ];

        // Init cURL.
        $ch = curl_init();

        // Set cURL options.
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/notification');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

        // Execute and get the response.
        $result = curl_exec($ch);
        $result = json_decode($result, true);
        curl_close($ch);

        if (is_callable($callback)) {
            $callback($result);
        }

        return $result;
    }

    /**
     * @param array $values
     * @throws Exception
     */
    protected static function validate($values, $rules)
    {
        $errors = [];

        foreach ($rules as $rule) {
            if (!isset($values[$rule])) {
                $errors[] = $rule;
            }
        }

        if (count($errors) > 0) {
            $join = implode(', ', $errors);
            throw new Exception("Option [{$join}] is required, but not present.");
        }
    }
}
