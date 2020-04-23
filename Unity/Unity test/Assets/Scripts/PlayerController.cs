using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    /*public float speed;*/
    public float maxSpeed = 2f;
    public float jump = 50f;

    private bool facingLeft = false;
    private bool isGrounded;

    private Animator animator;

    private Rigidbody2D rb2d;

    Vector3 Velocity;

    // Start is called before the first frame update
    void Start()
    {
        isGrounded = true;
        animator = GetComponent<Animator>();
        rb2d = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        float move = Input.GetAxis("Horizontal");

        float moveX = move * maxSpeed;
        float moveY = rb2d.velocity.y;

        if (Input.GetKeyDown(KeyCode.Space))
        {
            moveY += jump;
        }

        rb2d.velocity = new Vector3(moveX, moveY);

        if (move <= 0.1 && move >= -0.1)
        {
            if (isGrounded)
            {
                animator.Play("idle");
            }
            else
            {
                animator.Play("jump");
            }
        }
        else
        {
            if (isGrounded)
            {
                animator.Play("run");
            }
            else
            {
                animator.Play("jump");
            }
        }

        if (move < 0 && !facingLeft)
        {
            Flip();
        }
        else if (move > 0 && facingLeft)
        {
            Flip();
        }
    }

    void Flip()
    {
        facingLeft = !facingLeft;
        Vector3 scale = transform.localScale;
        scale.x *= -1;
        transform.localScale = scale;
    }

    void OnCollisionEnter(Collision col)
    {
        if (col.gameObject.tag == "tilemap")
        {
            isGrounded = true;
        }
    }

    void OnCollisionExit(Collision col)
    {
        if (col.gameObject.name == "tilemap")
        {
            isGrounded = false;
        }
    }
}
